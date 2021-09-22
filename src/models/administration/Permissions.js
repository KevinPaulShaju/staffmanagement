const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RolesSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
  name: { type: String },
  adminModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  staffModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  careTakerModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  patientModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  scheduleModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  financeModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  ndisModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
  nagModule: {
    enabled: { type: Boolean, enum: [true, false], default: false },
    read: { type: Boolean, enum: [true, false], default: false },
    write: { type: Boolean, enum: [true, false], default: false },
  },
});

const Roles = new mongoose.model("Roles", RolesSchema);
module.exports = Roles;
