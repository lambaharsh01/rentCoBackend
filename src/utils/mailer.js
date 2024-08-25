import nodemailer from "nodemailer";

export const mailTransport = () => {
  let user = process.env.GMAIL_USER;
  let pass = process.env.GMAIL_PASS;

  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: { user, pass },
  });
};
