const Admin = require("../../Models/administration/Admin");
const isEmpty = require("lodash.isempty");
const userValidation = require("../../Services/validation");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  const { name, email, gender, phone, role, password, password2 } = req.body;
  // validating the input
  if (!req.body) {
    return res.status(400).json({ message: "Inputs can not be left empty." });
  }
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    //   checking if the email has already registered
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "This user already exists. Try logging in." });
    }
    // confirming passwords
    else if (password !== password2) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Inputs can not be left empty." });
  }
  const { email, password } = req.body;

  try {
    // checking if the user exists
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res
        .status(400)
        .json({ message: "User does not exists.Try signing up." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingAdmin.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid password.Please check your password and try again",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingAdmin._id;
    const accessToken = jwt.sign(userId.toString(), key);
    res.json({ accessToken: accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
