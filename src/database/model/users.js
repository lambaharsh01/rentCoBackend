import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpSentTime: {
      type: Date,
    },
    otpAttempts: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const users = mongoose.models.users || mongoose.model("users", userSchema);

export default users;
