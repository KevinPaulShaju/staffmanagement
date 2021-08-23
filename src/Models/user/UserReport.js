const { boolean } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserReportSchema = mongoose.Schema({
  endUserId: { type: Schema.Types.ObjectId, required: true, ref: "endusers" },
  carerId: { type: Schema.Types.ObjectId, required: true, ref: "carer" },
  report: { type: String, required: true },
  reportType: { type: String, required: true },
  fromEndUser: { type: String, enum: ["yes", "no"] },
  createddate: { type: Date, required: true },
  createdTime: { type: Date, required: true },
  reportHappenedDate: { type: Date, required: true },
  reportHappenedTime: { type: Date, required: true },
});

const UserReport = mongoose.model("UserReport", UserReportSchema);
module.exports = UserReport;
