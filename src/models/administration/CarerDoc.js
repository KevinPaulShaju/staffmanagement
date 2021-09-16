const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarerDocSchema = new mongoose.Schema({
  carerId: { type: Schema.Types.ObjectId, ref: "Staff" },
  policeCheckIssueDate: { type: Date },
  policeCheckIssuePath: { type: String, required: true },
  wwcCertificateNumber: { type: Number },
  wwcExpiryDate: { type: Date },
  wccCertificatePath: { type: String },
  firstAidIssueDate: { type: Date },
  firstAidIssueDocumentpath: { type: String },
  cprIssueDate: { type: Date },
  cprCertificatePath: { type: String },
  carRegistrationNumber: { type: Number },
  carRegistrationExpiry: { type: Date },
  carRegistrationCertificatePath: { type: String },
  manualHandlingLastRefreshDate: { type: Date },
  nextSupervisiondate: { type: Date },
});

const CarerDoc = mongoose.model("CarerDoc", CarerDocSchema);
module.exports = CarerDoc;
