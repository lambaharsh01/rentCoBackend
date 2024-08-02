import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema(
  {
    memberName: {
      type: String,
      required: true,
    },
    memberEmail: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    phoneNumberBackup: {
      type: String,
    },
    groupId: {
      type: String,
    },
    tenancyType: {
      //shop(commercial), godown(commercial), rooms(residential), floor(residential)
      type: String,
    },
    rentAmount: {
      type: Number,
    },
    aadhaarNumber: {
      type: String,
    },
    // tenantPicture:{}
  },
  {
    timestamps: true,
  }
);

const members =
  mongoose.models.members || mongoose.model("members", memberSchema);

export default members;
