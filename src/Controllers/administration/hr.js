const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  userValidation,
  updateValidation,
  passwordValidation,
} = require("../../Services/validation");

const HResources = require("../../Models/administration/HResources");

exports.createHr = async (req, res) => {
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
    // const admin = await Admin.findOne({ _id: req.user.id });

    // if (!admin) {
    //   return res.status(401).json({ message: "Unauthorized attempt" });
    // }

    //   checking if the email has already registered
    const existingHr = await HResources.findOne({ email: email });
    if (existingHr) {
      return res.status(406).json({ error: "This user already exists." });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newHr = new HResources(req.body);
    const savedHr = await newHr.save();
    res.status(200).json({
      message: `hr staff has been successfully registered.`,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

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


exports.hrDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findHR = await HResources.findOne({ _id }).select("-password");
    if(!findHR) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({message: findHR});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}


exports.updateHrDetails = async (req, res) => {
  const hrId = req.params.hrId;
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
    // const isAdmin = await Admin.findOne({ _id: req.user.id });
    // if (!isAdmin) {
    //   return res.status(401).json({ message: "Unauthorized attempt" });
    // }
    const existingHr = await HResources.findOne({ _id: hrId });
    if (!existingHr) {
      return res.status(404).json({ error: "hr does not exist" });
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingHr[key] && existingHr[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedHr = await HResources.updateOne({ _id: hrId }, query);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHrPasswords = async (req, res) => {
  const hrId = req.params.hrId;
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
    // const isAdmin = await Admin.findOne({ _id: req.user.id });
    // if (!isAdmin) {
    //   return res.status(401).json({ message: "Unauthorized attempt" });
    // }
    const existingHr = await HResources.findOne({ _id: hrId });
    if (!existingHr) {
      return res.status(404).json({ error: "hr does not exist" });
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingHr[key] && existingHr[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }
    const updatedHr = await HResources.updateOne({ _id: hrId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHrAccount = async (req, res) => {
  const hrId = req.params.hrId;

  try {
    // const isAdmin = await Admin.findOne({ _id: req.user.id });
    // if (!isAdmin) {
    //   return res.status(401).json({ message: "Unauthorized attempt" });
    // }
    const existingHr = await HResources.findOne({ _id: hrId });
    if (!existingHr) {
      return res.status(404).json({ error: "hr does not exist" });
    }
    await existingHr.remove();
    res.status(200).json({ message: "hr Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
