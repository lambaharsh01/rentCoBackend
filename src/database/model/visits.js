import mongoose, { Schema } from "mongoose";

const visitSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "tenants",
      required: true,
    },
    tenantName: {
      type: String,
      required: true,
    },
    tenantPhoneNumber: {
      type: String,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    electricityAmountPerUnit: {
      // N/A
      type: Number,
    },
    previousReading: {
      type: Number,
    },
    currentReading: {
      type: Number,
    },
    totalUnits: {
      type: Number,
    },
    electricityBill: {
      type: Number,
    },
    previouslyPending: {
      type: Boolean,
      required: true,
    },
    previouslyPendingAmount: {
      type: Number,
    },
    damages: {
      type: Boolean,
      required: true,
    },
    damagesExplained: {
      type: String,
    },
    remark: {
      type: String,
    },
    currentMonthTotalRent: {
      type: Number,
      required: true,
    },
    totalRent: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const visits = mongoose.models.visits || mongoose.model("visits", visitSchema);

export default visits;
