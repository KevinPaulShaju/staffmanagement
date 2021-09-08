const {
  staffValidation,
  updateValidation,
  passwordValidation,
} = require("../../services/staffValidation");
const Staff = require("../../models/administration/staff");
const Roles = require("../../models/administration/Roles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Create staff
exports.createStaff = async (req, res) => {
  const role = req.query.role;
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
    const existingStaff = await Staff.findOne({ email: email, role: role });
    if (existingStaff) {
      return res
        .status(406)
        .json({ error: `This ${email} with this ${role} already exists.` });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newStaff = new Staff({
      name,
      email,
      gender,
      phone,
      role,
      password,
    });
    const savedStaff = await newStaff.save();

    const newRoles = new Roles({
      staffId: savedStaff._id,
      onModel: "staff",
    });
    const savedRole = await newRoles.save();
    res.status(200).json({
      message: `${role} staff has been successfully registered.`,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

// staff login
exports.staffLogin = async (req, res) => {
  const { email, password } = req.body;
  const role = req.query.role;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    let existingStaff = await Staff.findOne({ email: email });
    if (!existingStaff) {
      return res.status(404).json({ error: `${role} does not exist.` });
    }

    //   match password
    const match = await bcrypt.compare(password, existingStaff.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingStaff._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    existingStaff.password = undefined;
    res.status(200).json({ accessToken: accessToken, staff: existingStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update staff details
exports.updateStaffDetails = async (req, res) => {
  // const role = req.query.role;
  // console.log(role);
  const staffId = req.params.staffId;
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
    const existingStaff = await Staff.findOne({ _id: staffId });
    if (!existingStaff) {
      return res.status(404).json({ error: "Staff does not exist" });
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingStaff[key] && existingStaff[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedStaff = await Staff.updateOne({ _id: staffId }, query);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update staff password
exports.updateStaffPasswords = async (req, res) => {
  const role = req.query.role;
  const staffId = req.params.staffId;
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
    const existingStaff = await Staff.findOne({ _id: staffId });
    if (!existingStaff) {
      return res.status(404).json({ error: "staff does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingStaff[key] && existingStaff[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedStaff = await Staff.updateOne({ _id: staffId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete staff
exports.deletestaffAccount = async (req, res) => {
  const role = req.query.role;
  const staffId = req.params.staffId;

  try {
    const existingStaff = await Staff.findOne({ _id: staffId });
    if (!existingStaff) {
      return res.status(404).json({ error: "Staff does not exist" });
    }
    await existingStaff.remove();
    res.status(200).json({ message: "Staff Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// view all staff by role

exports.viewStaff = async (req, res) => {
  const role = req.query.role;
  try {
    const findStaffs = await Staff.find({ role: role }).select("-password");
    if (findStaffs.length === 0) {
      return res.status(200).json({ message: "No Staff profile to view" });
    } else {
      return res.status(200).json({ messages: findStaffs });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.viewAllStaffs = async (req, res) => {
  try {
    const allStaffs = await Staff.find().select("-password");
    if (allStaffs.length === 0) {
      return res.status(200).json({ message: "No Staff profile to view" });
    }
    res.status(200).json({ messages: allStaffs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.staffProfile = async (req, res) => {
  const role = req.query.role;
  const staffId = req.params.staffId;
  try {
    const findStaff = await Staff.findOne({ _id: staffId }).select("-password");
    if (!findStaff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    res.status(200).json({ message: findStaff });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
