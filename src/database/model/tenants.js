import mongoose, { Schema } from "mongoose";
// const { Schema } = mongoose;

const tenantSchema = new Schema(
  {
    tenantName: {
      type: String,
      required: true,
    },
    tenantEmail: {
      type: String,
    },
    tenantPhoneNumber: {
      type: String,
      required: true,
    },
    tenantBackupPhoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "groups",
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    tenancyType: {
      //shop(commercial), godown(commercial), rooms(residential), floor(residential)
      type: String,
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    aadhaarNumber: {
      type: String,
    },
    aadhaarPictureFront: {
      type: String,
    },
    aadhaarPictureBack: {
      type: String,
    },
    tenantPicture: { type: String },
  },
  {
    timestamps: true,
  }
);

const tenants =
  mongoose.models.tenants || mongoose.model("tenants", tenantSchema);

export default tenants;
