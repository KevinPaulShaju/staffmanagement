const Carer = require("../../Models/administration/carer");
const { userValidation } = require("../../Services/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerCarer = async (req, res) => {
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
    const existingCarer = await Carer.findOne({ email: email });
    if (existingCarer) {
      return res.status(406).json({ error: "This Carer already exists." });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newCarer = new Carer(req.body);
    const savedCarer = await newCarer.save();
    res
      .status(200)
      .json({ message: `Carer staff has been successfully registered.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.carerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(406)
      .json({ error: "Both Email & Password must be provided" });
  }

  try {
    // checking if the user exists
    const existingCarer = await Carer.findOne({ email: email });
    if (!existingCarer) {
      return res.status(404).json({ error: "Carer does not exist." });
    }

    //   match password
    const match = await bcrypt.compare(password, existingCarer.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // jwt authorization
    const key = process.env.JWT_SECRET;
    userId = existingCarer._id;
    const accessToken = jwt.sign(userId.toString(), key);
    console.log(accessToken);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add controller to show all carer

exports.carerDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findCarer = await Carer.findOne({ _id }).select("-password");
    if (!findCarer) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: findCarer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateCarerPasswords = async (req, res) => {
  const carerId = req.params.carerId;

  const { error } = passwordValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
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
    const existingCarer = await Carer.findOne({ _id: carerId });
    if (!existingCarer) {
      return res.status(404).json({ error: "Carer does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingCarer[key] && existingCarer[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedCarer = await Carer.updateOne({ _id: carerId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCarerAccount = async (req, res) => {
  const carerId = req.params.carerId;

  try {
    const existingCarer = await Carer.findOne({ _id: carerId });

    if (!existingCarer) {
      return res.status(404).json({ error: "Carer does not exist" });
    }

    await existingCarer.remove();
    res.status(200).json({ message: "Carer Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
