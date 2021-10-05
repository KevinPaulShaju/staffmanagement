const mongoose = require("mongoose");

const Modules = {
  enabled: { type: Boolean, enum: [true, false], default: false },
  read: { type: Boolean, enum: [true, false], default: false },
  write: { type: Boolean, enum: [true, false], default: false },
};

const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true },
  adminModule: Modules,
  staffModule: Modules,
  careTakerModule: Modules,
  patientModule: Modules,
  scheduleModule: Modules,
  financeModule: Modules,
  ndisModule: Modules,
  nagModule: Modules,
  supportCoordinatorModule: Modules,
});

const Roles = new mongoose.model("Roles", rolesSchema);
module.exports = Roles;
