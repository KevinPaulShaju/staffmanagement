const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const UserReport = require("../../models/user/reportuser");
const Schedules = require("../schedules/schedules");

const EndUserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: null },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  dateOfBirth: { type: Date, default: Date.now() },
  address: { type: String, default: "not provided" },
  geoLocation: {
    type: { type: String, required: true, enum: ["Point"] },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  languageSpoken: { type: Array, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  emergencyContactRelationship: { type: String, required: true },
  emergencyContactAddress: { type: String, required: true },
  ndicNumber: { type: Number, required: true },
  tacNumber: { type: Number, required: true },
  brokerageName: { type: String, required: true },
  // taxFileNumber: { type: Number, required: true },
  // maidenName: { type: String, required: true },
  // isNDIC: { type: String, required: true, enum: [true, false] },
  // isReferred: {
  //   type: String,
  //   required: true,
  //   default: false,
  //   enum: [true, false],
  // },
  // preferedName: { type: String, required: true },
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
