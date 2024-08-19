import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    tenantName: {
      type: String,
      required: true,
    },
    tenantPhoneNumber: {
      type: String,
    },
    propertyName: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
    recivedAmount: {
      type: Number,
      required: true,
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
