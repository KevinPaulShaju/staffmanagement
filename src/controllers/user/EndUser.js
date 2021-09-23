const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../../models/user/user");
const { passwordValidation } = require("../../services/staffValidation");
const {
  userUpdateValidation,
  userValidation,
} = require("../../services/userValidation");

exports.registerUsers = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    password2,
    phone,
    gender,
    DOB,
    address,
    role,
    location,
    languageSpoken,
    emergencyContactName,
    emergencyContactNumber,
    emergencyContactRelationship,
    emergencyContactAddress,
    secondaryContactName,
    secondaryContactNumber,
    secondaryContactRelationship,
    secondaryContactAddress,
    taxFileNumber,
  } = req.body;

  const { error } = userValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(406).json({ error: "This User already exists." });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(200).json({
      message: `User staff has been successfully registered.`,
      result: savedUser,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    let existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ error: "User does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    const userId = existingUser._id;
    const accessToken = jwt.sign(userId.toString(), key);
    existingUser.password = undefined;
    res.status(200).json({ accessToken: accessToken, user: existingUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.userId;
  const {
    name,
    email,
    password,
    password2,
    phone,
    gender,
    DOB,
    address,
    role,
    location,
    languageSpoken,
    emergencyContactName,
    emergencyContactNumber,
    emergencyContactRelationship,
    emergencyContactAddress,
    secondaryContactName,
    secondaryContactNumber,
    secondaryContactRelationship,
    secondaryContactAddress,
    taxFileNumber,
    maidenName,
    isNDIC,
    isReffered,
    preferredName,
  } = req.body;

  const { error } = userUpdateValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "This user does not exist" });
    }

    let query = { $set: req.body };

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, query, {
      new: true,
    }).select("-password");
    res.status(200).json({
      message: "User details has been updated successfully",
      updatedUser: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewUserProfile = async (req, res) => {
  try {
    // const _id = req.user.id;
    const userId = req.params.userId;
    const findUser = await User.findOne({ _id: userId }).select("-password");

    if (!findUser) {
      return res.status(404).json({ error: "User Does not exist" });
    }

    res.status(200).json({ result: findUser });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.params.userId;
  const { password, password2 } = req.body;
  const { error } = passwordValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  if (password !== password2) {
    return res.status(400).json({ error: "Passwords not matching." });
  }

  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "This user does not exist" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    let query = { $set: { password: hashedPass } };
    const updatedUser = await User.updateOne({ _id: userId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteuser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "This user does not exist" });
    }

    if (existingUser.photo !== null) {
      const profilePic = existingUser.photo;
      var fields = profilePic.split("/");
      const profilePhoto = fields[fields.length - 1];

      fs.unlink(`./uploads/images/user/${profilePhoto}`, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        await existingUser.remove();
      });
    }
    await existingUser.remove();
    res.status(200).json({ message: "User has been removed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
