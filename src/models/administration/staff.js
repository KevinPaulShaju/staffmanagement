const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Roles = require("./Roles");

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  role: { type: String, required: true },
  password: { type: String, required: true },
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

const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;
