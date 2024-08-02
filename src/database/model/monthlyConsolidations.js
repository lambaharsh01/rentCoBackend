import mongoose, { Schema } from "mongoose";

const monthlyConsolidationSchema = new Schema(
  {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    orignalMonthlyAmount: {
      type: Number,
      required: true,
    },
    electricityUnits: {
      type: Number,
      required: true,
    },
    perUnitCost: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    consolidatedAmount: {
      // kitna bacha including pichle mahino ka mila k
      type: Number,
      required: true,
    },
    memberId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const monthlyConsolidation =
  mongoose.models.monthlyConsolidation ||
  mongoose.model("monthlyConsolidation", monthlyConsolidationSchema);

export default monthlyConsolidation;
