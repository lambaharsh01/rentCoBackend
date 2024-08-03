import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    memberId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const transactions =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionSchema);

export default transactions;
