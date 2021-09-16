const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Roles = require("./Permissions");
const CarerDoc = require("../../models/administration/CarerDoc");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  photo: { type: String, default: null },
  role: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  geoLocation: {
    type: { type: String, enum: ["Point"] },
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
  position: { type: String, required: true },
  preferedName: { type: String, required: true },
  accountNumber: { type: Number, required: true },
  bankId: { type: Number, required: true },
  taxFileNumber: { type: Number, required: true },
  status:{type:String}
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
