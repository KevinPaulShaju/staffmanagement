const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const UserReport = require("../../models/user/reportuser");
const Schedules = require("../schedules/schedules");
const Schema = mongoose.Schema;

const EndUserSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  photo: { type: String, default: null },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  dateOfBirth: { type: Date, default: Date.now() },
  address: { type: String, default: "not provided" },
  geoLocation: {
    type: { type: String, required: true, enum: ["Point"] },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  languageSpoken: { type: Array },
  emergencyContactName: { type: String },
  emergencyContactNumber: { type: String },
  emergencyContactRelationship: { type: String },
  emergencyContactAddress: { type: String },
  isNDIC: { type: Boolean },
  ndicNumber: { type: Number },
  isTac: { type: Boolean },
  tacNumber: { type: Number },
  isBrokerage: { type: Boolean },
  brokerageName: { type: String },
  isSupportCoordinator: { type: Boolean },
  supportCoordinatorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "staff",
  },
  // taxFileNumber: { type: Number, },
  // maidenName: { type: String, },
  // isReferred: {
  //   type: String,
  //   required: true,
  //   default: false,
  //   enum: [true, false],
  // },
  // preferedName: { type: String, },
});

EndUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

EndUserSchema.pre("remove", async function (next) {
  const userReports = await UserReport.find({ endUserId: this._id });
  if (userReports || userReports.length !== 0) {
    await UserReport.deleteMany({ endUserId: this._id });
  }
  next();
});

EndUserSchema.pre("remove", async function (next) {
  const userSchedules = await Schedules.find({ userId: this._id });
  if (userSchedules || userSchedules.length !== 0) {
    await Schedules.deleteMany({ userId: this._id });
  }
  next();
});

const EndUsers = mongoose.model("endusers", EndUserSchema);
module.exports = EndUsers;
