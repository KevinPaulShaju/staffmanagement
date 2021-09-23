const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true },
});

const Roles = new mongoose.model("Roles", rolesSchema);
module.exports = Roles;
