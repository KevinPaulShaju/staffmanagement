const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StaffDocSchema = new mongoose.Schema({
  StaffId: { type: Schema.Types.ObjectId, ref: "Staff" },
  docType: { type: String, required: true },
  url: { type: String, required: true , default:null},
  docNumber: { type: String },
  docExpiryDate: { type: Date },
  // policeCheckIssueDate: { type: Date },
  // policeCheckIssuePath: { type: String, required: true },
  // wwcCertificateNumber: { type: Number },
  // wwcExpiryDate: { type: Date },
  // wccCertificatePath: { type: String },
  // firstAidIssueDate: { type: Date },
  // firstAidIssueDocumentpath: { type: String },
  // cprIssueDate: { type: Date },
  // cprCertificatePath: { type: String },
  // carRegistrationNumber: { type: Number },
  // carRegistrationExpiry: { type: Date },
  // carRegistrationCertificatePath: { type: String },
  // manualHandlingLastRefreshDate: { type: Date },
  // nextSupervisiondate: { type: Date },
});

const StaffDoc = mongoose.model("StaffDoc", StaffDocSchema);
module.exports = StaffDoc;
