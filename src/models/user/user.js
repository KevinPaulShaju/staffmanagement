const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const EndUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String,default:null},
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  DOB: { type: Date, default:Date.now() },
  address: { type: String, default: "not provided" },
  geolocation: { type: String },
  languageSpoken: { type: String },
  emergencyContactName: { type: String },
  emergencyContactNumber: { type: String },
  emergencyContactRelationship: { type: String },
  emergencyContactAddress: { type: String },
  secondaryContactName: { type: String },
  secondaryContactNumber: { type: String },
  secondaryContactRelationship: { type: String },
  secondaryContactAddress: { type: String },
  taxFileNumber: { type: String },
  maidenName: { type: String },
  isNDIC: { type: String, enum: ["yes", "no"] },
  isReferred: { type: String, default: "no", enum: ["yes", "no"] },
  preferredName: { type: String },
},{
  timestamps: true
});

EndUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

EndUserSchema.pre("remove", async function (next) {
  await UserReport.deleteMany({ endUserId: this._id });
  next();
});

const EndUsers = mongoose.model("endusers", EndUserSchema);
module.exports = EndUsers;
