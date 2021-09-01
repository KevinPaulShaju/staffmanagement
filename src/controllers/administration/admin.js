const {
  staffValidation,
  updateValidation,
  passwordValidation,
} = require("../../services/staffValidation");
const Admin = require("../../models/administration/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create admin
exports.createAdmin = async (req, res) => {
  const { name, email, gender, phone, password, password2 } = req.body;
  // validating the input

  if (!req.body) {
    return res.status(406).json({ error: "Inputs can not be left empty." });
  }

  const { error } = staffValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  try {
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
      return res
        .status(406)
        .json({ error: `This ${email} is already exists as admin` });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newAdmin = new Admin({ name, email, gender, phone, password });
    const savedAdmin = await newAdmin.save();
    res
      .status(200)
      .json({ message: `admin has been successfully registered.` });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// admin login
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
      return res.status(404).json({ error: `admin does not exist.` });
    }

    //   match password
    const match = await bcrypt.compare(password, existingAdmin.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Credentials" });
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

// update Admin details
exports.updateAdminDetails = async (req, res) => {
  const role = req.query.role;
  console.log(role);
  const adminId = req.params.adminId;
  const { error } = updateValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  const updates = Object.keys(req.body);

  const allowUpdates = ["name", "phone"];

  const isValidOperation = updates.every((update) =>
    allowUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Operation" });
  }

  try {
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin) {
      return res.status(404).json({ error: "Admin does not exist" });
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingAdmin[key] && existingAdmin[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedAdmin = await Admin.updateOne({ _id: adminId }, query);
    res
      .status(200)
      .json({ message: "Update Successfully", result: updatedAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update Admin password
exports.updateAdminPasswords = async (req, res) => {
  const role = req.query.role;
  const adminId = req.params.adminId;
  const { error } = passwordValidation(req.body);
  if (error) {
    return res.status(406).json({ message: error.details[0].message });
  }

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
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin) {
      return res.status(404).json({ error: "Admin does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingAdmin[key] && existingAdmin[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedAdmin = await Admin.updateOne({ _id: adminId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete staff
exports.deleteadminAccount = async (req, res) => {
  const role = req.query.role;
  const adminId = req.params.adminId;

  try {
    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin) {
      return res.status(404).json({ error: "Admin does not exist" });
    }
    await existingAdmin.remove();
    res.status(200).json({ message: "Admin Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.adminProfile = async (req, res) => {
  const adminId = req.params.adminId;
  try {
    const findAdmin = await Admin.findOne({ _id: adminId }).select("-password");
    if (!findAdmin) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json({ message: findAdmin });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
