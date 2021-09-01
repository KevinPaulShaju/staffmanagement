const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
// const CarerDoc = require("./CarerDoc");

const carerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: null },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  DOB: { type: Date },
  address: { type: String },
  role: { type: String, default: "carer" },
  geoLocation: {
    type: { type: String, enum: ["Point"]},
    coordinates: { type: [Number] },
  },
  languageSpoken: [String],
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
  preferredName: { type: String },
});

carerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

// carerSchema.pre("remove", async function (next) {
//   await CarerDoc.deleteMany({ carerId: this._id });
//   next();
// });

const Carer = mongoose.model("carer", carerSchema);
module.exports = Carer;
