const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Modules = {
  enabled: { type: Boolean, enum: [true, false], default: false },
  read: { type: Boolean, enum: [true, false], default: false },
  write: { type: Boolean, enum: [true, false], default: false },
};

const PermissionsSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
  name: { type: String },
  adminModule: Modules,
  staffModule: Modules,
  careTakerModule: Modules,
  patientModule: Modules,
  scheduleModule: Modules,
  financeModule: Modules,
  ndisModule: Modules,
  nagModule: Modules,
});

const Permissions = new mongoose.model("Permissions", PermissionsSchema);
module.exports = Permissions;
