const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  userValidation,
  updateValidation,
  passwordValidation,
} = require("../../Services/validation");

const HResources = require("../../Models/administration/HResources");
const Finance = require("../../Models/administration/Finance");
const Manager = require("../../Models/administration/Manager");
const Support = require("../../Models/administration/Support");

exports.hrLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    const existingHr = await HResources.findOne({ email: email });
    if (!existingHr) {
      return res.status(404).json({ error: "User does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingHr.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingHr._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.managerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    const existingManager = await Manager.findOne({ email: email });
    if (!existingManager) {
      return res.status(404).json({ error: "Manager does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingManager.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingManager._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.financeLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    const existingFinance = await Finance.findOne({ email: email });
    if (!existingFinance) {
      return res.status(404).json({ error: "Finance does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingFinance.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid Credentials",
      });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingFinance._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.supportLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    const existingSupport = await Support.findOne({ email: email });
    if (!existingSupport) {
      return res.status(404).json({ error: "Support does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingSupport.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingSupport._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
