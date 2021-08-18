const Admin = require("../../Models/administration/Admin");
const userValidation = require("../../Services/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  const { name, email, gender, phone, role, password, password2 } = req.body;
  // validating the input
  if (!req.body) {
    return res.status(406).json({ message: "Inputs can not be left empty." });
  }
  const { error } = userValidation(req.body);
  if (error) {
    return res.status(406).json({ message: error.details[0].message });
  }

  try {
    //   checking if the email has already registered
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res
        .status(406)
        .json({ message: "This user already exists. Try logging in." });
    }
    // confirming passwords
    else if (password !== password2) {
      return res.status(406).json({ message: "Passwords do not match." });
    }
    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(200).json({
      message: "User has been successfully registered. Please log in",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  if (!req.body) {
    return res.status(406).json({ message: "Inputs can not be left empty." });
  }
  const { email, password } = req.body;

  try {
    // checking if the user exists
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ message: "User does not exist.Try signing up." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingAdmin.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid password.Please check your password and try again",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingAdmin._id;
    const accessToken = jwt.sign(userId.toString(), key);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
