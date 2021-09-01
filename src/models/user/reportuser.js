const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserReportSchema = mongoose.Schema({
  endUserId: { type: Schema.Types.ObjectId, required: true, ref: "endusers" },
  carerId: { type: Schema.Types.ObjectId, required: true, ref: "carer" },
  report: { type: String, required: true },
  reportType: { type: String, required: true, default: "report" },
  fromEndUser: { type: String, enum: ["yes", "no"], default: "yes" },
  createddate: { type: Date, required: true, default: Date.now() },
  createdTime: { type: Date, required: true, default: Date.now() },
  reportHappenedDate: { type: Date, required: true, default: Date.now() },
  reportHappenedTime: { type: Date, required: true, default: Date.now() },
});

const UserReport = mongoose.model("UserReport", UserReportSchema);
module.exports = UserReport;
