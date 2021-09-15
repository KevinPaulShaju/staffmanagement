const mongoose = require("mongoose");
const RolesSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
  name: { type: String },
  adminModule: { type: Boolean, enum: [true, false], default: false },
  staffModule: { type: Boolean, enum: [true, false], default: false },
  careTakerModule: { type: Boolean, enum: [true, false], default: false },
  patientModule: { type: Boolean, enum: [true, false], default: false },
  scheduleModule: { type: Boolean, enum: [true, false], default: false },
  financeModule: { type: Boolean, enum: [true, false], default: false },
  ndisModule: { type: Boolean, enum: [true, false], default: false },
  nagModule: { type: Boolean, enum: [true, false], default: false },
});

const Roles = new mongoose.model("Roles", RolesSchema);
module.exports = Roles;
