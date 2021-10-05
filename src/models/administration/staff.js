const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Roles = require("./Permissions");
const CarerDoc = require("../../models/administration/CarerDoc");

const StaffSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  photo: { type: String, default: null },
  role: { type: String },
  password: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  geoLocation: {
    type: { type: String, enum: ["Point"] },
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
  position: { type: String },
  preferedName: { type: String },
  accountNumber: { type: Number },
  bankId: { type: Number },
  taxFileNumber: { type: Number },
  status: { type: String },
  active: {
    schedule: {
      to: { type: Date },
      from: { type: Date },
      location: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    working: { type: Boolean },
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "roles",
  },
});

//Hashing the Password
StaffSchema.pre("save", async function (next) {
  //const passwordHash = await bcrypt.hash(password,10);
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

StaffSchema.pre("remove", async function (next) {
  const role = await Roles.findOne({ staffId: this.id });
  if (role) {
    await role.remove();
  }
  next();
});

StaffSchema.pre("remove", async function (next) {
  const document = await CarerDoc.findOne({ carerId: this.id });
  if (document) {
    await document.remove();
  }
  next();
});

const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;
