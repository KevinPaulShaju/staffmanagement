const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  role: { type: String, required: true, default: "admin" },
  password: { type: String, required: true },
});

//Hashing the Password
AdminSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
