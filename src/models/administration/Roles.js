const mongoose = require("mongoose");
const RolesSchema = new mongoose.Schema({
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "onModel",
  },
  onModel: { type: String, required: true, enum: ["admin", "carer", "staff"] },
  name: { type: String },
  adminModule: { type: Boolean, enum: [true, false], default: false },
  hrModule: { type: Boolean, enum: [true, false], default: false },
  financeModule: { type: Boolean, enum: [true, false], default: false },
  ndisModule: { type: Boolean, enum: [true, false], default: false },
  nagModule: { type: Boolean, enum: [true, false], default: false },
});

const Roles = new mongoose.model("Roles", RolesSchema);
module.exports = Roles;
