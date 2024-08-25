import randomNumber from "../../utils/randomNumber.js";
import { hashPassword, verifyPassword } from "../../utils/cipher.js";
import { createToken } from "../../utils/createToken.js";

import { mailTransport } from "../../utils/mailer.js";

import {
  validateSchema,
  initialUserSchema,
  otpVerificationSchema,
  passwordSettingSchema,
} from "../../utils/validtionSchemas.js";

export const sendVerificationCode = async (req, res, next) => {
  try {
    let validatedUser = await validateSchema(initialUserSchema, req.body);

    let userEmail = validatedUser.userEmail;

    let existingUser = await req.db.users.findOne({ userEmail, active: true });
    if (existingUser) throw new Error("User already exists");

    let otp = randomNumber();

    let mailObject = {
      from: {
        name: "rentCo",
        address: process.env.GMAIL_USER,
      },
      to: userEmail,
      subject: "OTP For rentCo SignUp",
      text: `${otp} is yor sign up OTP for RentCo.`,
    };

    await new Promise((resolve, reject) => {
      mailTransport().sendMail(mailObject, (error, info) => {
        if (error) reject(error);
        resolve(info);
      });
    });

    let createUser = {
      ...validatedUser,
      otp,
      otpSentTime: new Date(),
      otpAttempts: 0,
    };

    await req.db.users.findOneAndUpdate(
      { userEmail, active: false },
      createUser,
      {
        new: false, // new: true, you can immediately see the updated data, which can be useful if you want to perform additional operations based on the updated document
        upsert: true, //creates a new document if no documents match the filter.
      }
    );

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    error.statusCode = 409;
    next(error);
  }
};

export const verifyUserEmail = async (req, res, next) => {
  try {
    let validOtpFormat = await validateSchema(otpVerificationSchema, req.body);

    let { otp, userEmail } = validOtpFormat;

    let userInfo = await req.db.users.findOne(
      { userEmail, active: false },
      "id otp otpSentTime otpAttempts"
    );

    if (!userInfo) throw new Error("Can not proceed ahead");
    if (userInfo.otpAttempts > 2) throw new Error("OTP attempts exhausted");

    const differenceInMilliseconds = new Date() - userInfo.otpSentTime;
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    if (differenceInMinutes > 1) throw new Error("Timeout");

    if (userInfo.otp !== otp) {
      await req.db.users.findOneAndUpdate(
        { userEmail },
        { $inc: { otpAttempts: 1 } }
      );
      return res.status(200).json({ success: false, message: "Incorrect OTP" });
    }

    let csrf = randomNumber();

    await req.db.users.findOneAndUpdate({ userEmail }, { otp: csrf });

    return res.status(200).json({
      success: true,
      message: "OTP Verification complete",
      data: { otp: csrf },
    });
  } catch (error) {
    next(error);
  }
};

export const setUserPassword = async (req, res, next) => {
  try {
    let passwordSettingFormat = await validateSchema(
      passwordSettingSchema,
      req.body
    );

    // hashPassword

    let { otp, userEmail, password, src } = passwordSettingFormat;

    let query = { otp, userEmail, active: false };
    let update = { password: await hashPassword(password), active: true };
    if (src === "reSet") {
      query.active = true;
      delete update.active;
    }

    let userData = await req.db.users.findOne(query);
    if (!userData) throw new Error("Can not proceed ahead");

    await req.db.users.findOneAndUpdate(query, update);

    return res
      .status(200)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginAuthentication = async (req, res, next) => {
  try {
    const { userEmail, password } = req.body;
    if (!userEmail) throw new Error("Email not provided");
    if (!password) throw new Error("Password not provided");

    const userInfo = await req.db.users.findOne({ userEmail });

    if (!userInfo) throw new Error("User not found");

    const passwordMatch = await verifyPassword({
      plainText: password,
      hashedValue: userInfo.password,
    });

    if (!passwordMatch) throw new Error("Incorrect password");

    const tokenObject = {
      _id: userInfo._id,
      userEmail: userInfo.userEmail,
      gender: userInfo.gender,
      phoneNumber: userInfo.phoneNumber,
      userName: userInfo.userName,
    };

    const token = createToken(tokenObject);

    return res.status(200).json({
      success: true,
      message: "User Authenticated Successfully",
      data: { token, userName: userInfo.userName },
    });
  } catch (error) {
    next(error);
  }
};
