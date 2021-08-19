const Admin = require("../../Models/administration/Admin");
const HR = require("../../Models/administration/HResources");
const { userValidation } = require("../../Services/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  const { name, email, gender, phone, role, password, password2 } = req.body;
  // validating the input

  if (!req.body) {
    return res.status(406).json({ error: "Inputs can not be left empty." });
  }

  const { error } = userValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  try {
    //   checking if the email has already registered
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res
        .status(406)
        .json({ error: "This user already exists. Try logging in." });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newAdmin = new Admin(req.body);
    const savedAdmin = await newAdmin.save();
    res.status(200).json({
      message: "User has been successfully registered. Please log in",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    const existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res
        .status(404)
        .json({ error: "User does not exist.Try signing up." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingAdmin.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingAdmin._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.adminDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findAdmin = await Admin.findOne({ _id }).select("-password");
    if(!findAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({message: findAdmin});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}


exports.updateAdminDetails = async (req, res) => {
  const updates = Object.keys(req.body);

  const allowUpdates = ["name", "phone"];

  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Operation" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdminPasswords = async (req, res) => {
  if (req.body.password !== req.body.password2) {
    return res.status(400).json({ error: "Passwords not matching." });
  }

  const updates = Object.keys(req.body);

  const allowUpdates = ["password", "password2"];

  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Operation" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).json({ message: "Password Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdminAccount = async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).json({ message: "Admin Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
