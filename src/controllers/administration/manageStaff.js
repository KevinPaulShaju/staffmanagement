const {
  staffValidation,
  staffUpdateValidation,
  passwordValidation,
} = require("../../services/staffValidation");
const { rolesValidation } = require("../../services/rolesValidation");
const Staff = require("../../models/administration/staff");
const Permissions = require("../../models/administration/Permissions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Roles = require("../../models/administration/Roles");

//Create staff
exports.createStaff = async (req, res) => {
  const staffRole = req.query.role;
  // const { name, email, gender, phone, password, password2 } = req.body;
  if (!req.body.basicDetails || !req.body.permissions) {
    return res.status(406).json({ error: "Fill up all the details." });
  }
  const {
    basicDetails: {
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
    },
    permissions: {
      adminModule,
      staffModule,
      careTakerModule,
      patientModule,
      scheduleModule,
      financeModule,
      ndisModule,
      nagModule,
    },
  } = req.body;

  // validating the input
  const { error } = staffValidation(req.body.basicDetails);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  const { error: error1 } = rolesValidation(req.body.permissions);
  if (error1) {
    return res.status(406).json({ error: error1.details[0].message });
  }
  try {
    const existingStaff = await Staff.findOne({ email: email });
    if (existingStaff) {
      return res
        .status(406)
        .json({ error: `This ${email} with this ${role} already exists.` });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    var newStaff;
    if (req.body.basicDetails.role === "carer") {
      newStaff = new Staff({ ...req.body.basicDetails, status: "pending" });
    } else {
      newStaff = new Staff(req.body.basicDetails);
    }
    const savedStaff = await newStaff.save();

    const newPermissions = new Permissions({
      ...req.body.permissions,
      staffId: savedStaff._id,
      name: savedStaff.name,
    });

    const roleExists = await Roles.findOne({ role: role });
    if (!roleExists) {
      const newRole = new Roles({ role: role });
      await newRole.save();
    }

    const savedPermissions = await newPermissions.save();
    res.status(200).json({
      message: `${role} staff has been successfully registered.`,
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

    const roleModules = await Permissions.findOne({
      staffId: existingStaff._id,
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
  const { error } = staffUpdateValidation(req.body.basicDetails);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  const { error: error1 } = rolesValidation(req.body.permissions);
  if (error1) {
    return res.status(406).json({ error: error1.details[0].message });
  }

  try {
    const existingStaff = await Staff.findOne({ _id: staffId });
    if (!existingStaff) {
      return res.status(404).json({ error: "Staff does not exist" });
    }

    //   query
    let query = { $set: req.body.basicDetails };

    const updatedStaff = await Staff.findOneAndUpdate({ _id: staffId }, query, {
      new: true,
    }).select("-password");

    let query2 = { $set: req.body.permissions };

    const updatedPermissions = await Permissions.findOneAndUpdate(
      {
        staffId: existingStaff._id,
      },
      query2,
      { new: true }
    );

    res.status(200).json({
      message: "Update Successfully",
      updatedStaff: updatedStaff,
      updatedPermissions: updatedPermissions,
    });
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

      fs.unlink(`./uploads/images/staff/${profilePhoto}`, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        await existingStaff.remove();
      });
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
    const permissions = await Permissions.findOne({ staffId: findStaff._id });
    if (!permissions) {
      res.status(404).json({ error: "Missing permissions data" });
    }
    res.status(200).json({ staff: findStaff, permissions: permissions });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
