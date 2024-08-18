import mongoose, { Schema } from "mongoose";

const visitSchema = new Schema(
  {
    userId: {
      // email of who visited
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
    previousElectricityUnits: {
      type: Number,
      required: true,
    },
    currentElectricityUnits: {
      type: Number,
      required: true,
    },
    totalMonthlyUnits: {
      type: Number,
      required: true,
    },
    damages: {
      type: Boolean,
      required: true,
    },
    damagesExplained: {
      type: String,
    },
    lastMonthsPending: {
      type: Boolean,
      required: true,
    },
    lastMonthsPendingAmount: {
      type: Number,
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const visits = mongoose.models.visits || mongoose.model("visits", visitSchema);

export default visits;
