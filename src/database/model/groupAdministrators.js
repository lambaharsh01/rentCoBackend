import mongoose, { Schema } from "mongoose";

const groupAdministratorSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    role: { //admin 
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const groupAdministrators =
  mongoose.models.groups ||
  mongoose.model("groupAdministrators", groupAdministratorSchema);

export default groupAdministrators;
