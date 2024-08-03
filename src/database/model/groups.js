import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    groupDiscription: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const groups = mongoose.models.groups || mongoose.model("groups", groupSchema);

export default groups;
