const {
  staffValidation,
  staffUpdateValidation,
  passwordValidation,
} = require("../../services/staffValidation");
const { rolesValidation } = require("../../services/rolesValidation");
const Staff = require("../../models/administration/staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadStaff, s3 } = require("../../helpers/photo");
const fs = require("fs");
const Roles = require("../../models/administration/Roles");

//Create staff
exports.createStaff = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    phone,
    gender,
    dateOfBirth,
    address,
    geoLocation,
    languageSpoken,
    emergencyContactName,
    emergencyContactNumber,
    emergencyContactRelationship,
    emergencyContactAddress,
    role,
    position,
    preferredName,
    accountNumber,
    bankId,
    taxFileNumber,
    roleId,
  } = req.body;

  if (!req.body.email || !req.body.password || !req.body.password2) {
    return res.status(406).json({ error: "Fill up all the details." });
  }

  // validating the input
  // const { error } = staffValidation(req.body);
  // if (error) {
  //   return res.status(406).json({ error: error.details[0].message });
  // }

  try {
    const existingStaff = await Staff.findOne({ email: email });
    if (existingStaff) {
      return res
        .status(406)
        .json({ error: `This ${email} with this ${role} already exists.` });
    }

    const existingRole = await Roles.findOne({ _id: roleId });
    if (!existingRole) {
      return res.status(404).json({
        error: `Role with this if does not exist.`,
      });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    var newStaff = new Staff({ ...req.body, status: "pending" });

    const savedStaff = await newStaff.save();

    const staffToSend = await Staff.findOne({ _id: savedStaff.id }).select(
      "-password"
    );
    const rolesToSend = await Roles.findOne({ _id: savedStaff.roleId });
    res.status(200).json({
      message: `${role} staff has been successfully registered.`,
      staff: { staffToSend, rolesToSend },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// staff login
exports.staffLogin = async (req, res) => {
  const { email, password } = req.body;
  // const role = req.query.role;
  // if (!role) {
  //   return res.status(406).json({ error: "Role not specified" });
  // }

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    let existingStaff = await Staff.findOne({ email: email });
    if (!existingStaff) {
      return res.status(404).json({ error: `Staff does not exist.` });
    }

    //   match password
    const match = await bcrypt.compare(password, existingStaff.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    const roleModules = await Roles.findOne({
      _id: existingStaff.roleId,
    });

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingStaff._id;
    const accessToken = jwt.sign(userId.toString(), key);
    existingStaff.password = undefined;
    res.status(200).json({
      accessToken: accessToken,
      staff: existingStaff,
      roleModules: roleModules,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update staff details
exports.updateStaffDetails = async (req, res) => {
  // const role = req.query.role;
  const staffId = req.params.staffId;
  // const { error } = staffUpdateValidation(req.body.basicDetails);
  // if (error) {
  //   return res.status(406).json({ error: error.details[0].message });
  // }
  // const { error: error1 } = rolesValidation(req.body.permissions);
  // if (error1) {
  //   return res.status(406).json({ error: error1.details[0].message });
  // }

  try {
    const existingStaff = await Staff.findOne({ _id: staffId });
    if (!existingStaff) {
      return res.status(404).json({ error: "Staff does not exist" });
    }

    //   query
    let query = { $set: req.body };

    const updatedStaff = await Staff.findOneAndUpdate({ _id: staffId }, query, {
      new: true,
    }).select("-password");

    const roleModules = await Roles.findOne({
      _id: existingStaff.roleId,
    });

    res.status(200).json({
      message: "Update Successfully",
      updatedStaff: updatedStaff,
      roleModules: roleModules,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update staff password
exports.updateStaffPasswords = async (req, res) => {
  const staffId = req.params.staffId;
  const { error } = passwordValidation(req.body);
  if (error) {
    return res.status(406).json({ message: error.details[0].message });
  }

  if (req.body.password !== req.body.password2) {
    return res.status(400).json({ error: "Passwords not matching." });
  }

  try {
    const existingStaff = await Staff.findOne({ _id: staffId }).select(
      "-password"
    );
    if (!existingStaff) {
      return res.status(404).json({ error: "staff does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }
    //   query
    const query = { $set: { password: req.body.password } };

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

    if (existingStaff.photo !== null) {
      const profilePic = existingStaff.photo;
      var fields = profilePic.split("/");
      const profilePhoto = fields[fields.length - 1];

      var params = { Bucket: "photostaffs", Key: profilePhoto };
      s3.deleteObject(params, async (err, res) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
      });

      await existingStaff.remove();
      return res.status(200).json({ message: "Staff has been removed" });
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
      return res.status(200).json({ message: findStaffs });
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
    res.status(200).json({ message: allStaffs });
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
    const roles = await Roles.findOne({ staffId: findStaff.roleId });
    if (!roles) {
      res.status(404).json({ error: "Missing roles data" });
    }
    res.status(200).json({ staff: findStaff, roles: roles });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
