const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const Carer = require("../../models/administration/carer");
const Roles = require("../../models/administration/Permissions");

const {
  updateValidation,
  passwordValidation,
} = require("../../services/staffValidation");
const { carerValidation } = require("../../services/carerValidation");

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
    geoLocation,
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

  // const { error } = carerValidation(req.body);
  // if (error) {
  //     return res.status(406).json({ error: error.details[0].message });
  // }

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

    const newRoles = new Roles({
      staffId: savedCarer._id,
      onModel: "carer",
    });
    const savedRole = await newRoles.save();

    res.status(200).json({
      message: `Carer staff has been successfully registered.`,
      result: savedCarer,
    });
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
    let existingCarer = await Carer.findOne({ email: email });
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
    existingCarer.password = undefined;
    res.status(200).json({ accessToken: accessToken, carer: existingCarer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update carer details
exports.updateCarerDetails = async (req, res) => {
  const carerId = req.params.carerId;
  const { error } = updateValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }
  const updates = Object.keys(req.body);

  try {
    const existingCarer = await Carer.findOne({ _id: carerId });
    if (!existingCarer) {
      return res.status(404).json({ error: "carer does not exist" });
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingCarer[key] && existingCarer[key] !== req.body[key])
        query.$set[key] = req.body[key];
    }
    const updatedCarer = await Carer.updateOne({ _id: carerId }, query);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
        query.$set[key] = req.body[key];
    }

    const updatedCarer = await Carer.updateOne({ _id: carerId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.carerDetails = async (req, res) => {
  const carerId = req.params.carerId;
  try {
    //   const _id = req.user.id;
    const findCarer = await Carer.findOne({ _id: carerId }).select("-password");
    if (!findCarer) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: findCarer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.deleteCarerAccount = async (req, res) => {
  const carerId = req.params.carerId;

  try {
    const existingCarer = await Carer.findOne({ _id: carerId });

    if (!existingCarer) {
      return res.status(404).json({ error: "Carer does not exist" });
    }

    if (existingCarer.photo !== null) {
      const profilePic = existingCarer.photo;
      var fields = profilePic.split("/");
      const profilePhoto = fields[fields.length - 1];

      fs.unlink(`./uploads/images/${profilePhoto}`, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        await existingCarer.remove();
      });

      return res.status(200).json({ message: "Carer Account Deleted" });
    }

    await existingCarer.remove();
    res.status(200).json({ message: "Carer Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.viewAllCarers = async (req, res) => {
  try {
    const carers = await Carer.find();
    if (!carers || carers.length === 0) {
      return res.status(404).json({ error: "No carers found" });
    }
    res.status(200).json({ carers: carers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
