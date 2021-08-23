const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userValidation } = require("../../Services/validation");
const { updateValidation } = require("../../Services/validation");
const { passwordValidation } = require("../../Services/validation");


const User = require("../../Models/user/EndUsers");

exports.registerUsers = async (req, res) => {
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

  if (!name || !email || !password || !password2 || !phone || !gender) {
    return res.status(400).json({
      error:
        "name, email, password, password2, phone & gender all fields are required",
    });
  }

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
    res
      .status(200)
      .json({ message: `User staff has been successfully registered.` });
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
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ error: "Carer does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingUser._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserDetails = async (req, res) => {
  const userId = req.params.userId;

  const updates = Object.keys(req.body);

  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "carer does not exist" });
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingUser[key] && existingUser[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedUser = await User.updateOne({ _id: userId }, query);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserPasswords = async (req, res) => {
  const userId = req.params.userId;

  const { error } = passwordValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  if (req.body.password !== req.body.password2) {
    return res.status(400).json({ error: "Passwords not matching." });
  }

  try {
    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingUser[key] && existingUser[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedCarer = await User.updateOne({ _id: userId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserAccount = async (req, res) => {
  const userId = req.params.userId;

  try {
    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({ error: "User does not exist" });
    }

    await existingUser.remove();
    res.status(200).json({ message: "User Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
