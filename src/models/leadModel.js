import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    employeeCode: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      require: true,
      default: "new",
      enum: ["new", "completed"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const LeadModel = mongoose.model("Lead", LeadSchema);
export default LeadModel;
