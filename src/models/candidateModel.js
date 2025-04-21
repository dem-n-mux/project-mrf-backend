import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["new", "approved", "rejected"],
    default: "new",
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  doj: {
    type: Date,
    required: true,
  },
  client: {
    type: String,
  },
  designation: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  employeeCode: {
    type: String,
  },
  photo: {
    type: String,
  },
  signature: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  location: {
    type: String,
  },
  currentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  esiDispensaryLocation: {
    type: String,
  },
  bankAccount: {
    type: String,
  },
  uanNumber: {
    type: String,
  },
  esicNumber: {
    type: String,
  },
  ifsc: {
    type: String,
  },
  bankName: {
    type: String,
  },
  panNo: {
    type: String,
  },
  aadharNo: {
    type: String,
  },
  aadharFront: {
    type: String,
  },
  aadharBack: {
    type: String,
  },
  pan: {
    type: String,
  },
  bankStatement: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  fatherDOB: {
    type: Date,
  },
  fatherPhoto: {
    type: String,
  },
  fatherALStatus: {
    type: String,
    enum: ["alive", "late"],
    default: "alive",
  },
  motherName: {
    type: String,
  },
  motherDOB: {
    type: Date,
  },
  motherPhoto: {
    type: String,
  },
  motherALStatus: {
    type: String,
    enum: ["alive", "late"],
    default: "alive",
  },
  spouseName: {
    type: String,
  },
  spouseDOB: {
    type: Date,
  },
  spousePhoto: {
    type: String,
  },
  children: [
    {
      childName: {
        type: String,
      },
      childDOB: {
        type: Date,
      },
      childPhoto: {
        type: String,
      },
    },
  ],
  tenthCertificate: {
    type: String,
  },
  twelfthCertificate: {
    type: String,
  },
  otherCertificate: {
    type: String,
  },
  gradCertificate: {
    type: String,
  },
  postGradCertificate: {
    type: String,
  },
  lastCompanyDetails: {
    type: String,
  },
  offerLetter: {
    type: String,
  },
  salarySlip: {
    type: String,
  },
  resume: {
    type: String,
  },
  undertakingForm: {
    type: String,
  },
  releaseLetter: {
    type: String,
  },
  appointmentLetter: {
    type: String,
  },
  yearsOfExperience: {
    type: Number,
  },
}, {
  timestamps: true,
});

const candidateModel = mongoose.model("Candidate", candidateSchema);
export default candidateModel;
