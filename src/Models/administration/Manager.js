const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ManagerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  role: { type: String, required: true, default: "hr" },
  password: { type: String, required: true },
});

//Hashing the Password
ManagerSchema.pre("save", async function (next) {
  //const passwordHash = await bcrypt.hash(password,10);
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const Manager = mongoose.model("Manager", ManagerSchema);
module.exports = Manager;
