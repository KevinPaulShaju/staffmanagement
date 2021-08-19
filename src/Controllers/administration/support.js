const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    userValidation,
    updateValidation,
    passwordValidation
} = require("../../Services/validation");


const Support = require("../../Models/administration/Support");


exports.createSupport = async (req, res) => {
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
    
    const existingSupport = await Support.findOne({ email:email });
    if (existingSupport) {
      return res.status(406).json({ error: "This Support already exists." });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newSupport = new Support(req.body);
    const savedSupport= await newSupport.save();
    res.status(200).json({message: `Manager staff has been successfully registered.`,});

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

};

exports.supportLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(406).json({ error: "Both Email & Password must be provided" });
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
      return res.status(401).json({error: "Invalid Credentials",});
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


exports.supportDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findSupport = await Support.findOne({ _id }).select("-password");
    if(!findSupport) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json({message: findSupport});
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}


exports.updateSupportDetails = async (req, res) => {

  const supportId = req.params.supportId;
  const { error } = updateValidation(req.body);

  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  const updates = Object.keys(req.body);

  const allowUpdates = ["name", "phone"];

  const isValidOperation = updates.every((update) => allowUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Operation" });
  }

  try {
    
    const existingSupport = await Support.findOne({ _id: supportId });

    if (!existingSupport) {
      return res.status(404).json({ error: "Support does not exist" });
    }

    //   query
    let query = { $set: {} };

    for (let key in req.body) {
      if (existingSupport[key] && existingSupport[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedSupport = await Support.updateOne({ _id: supportId }, query);
    res.status(200).json({ message: "Update Successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSupportPasswords = async (req, res) => {
  const supportId = req.params.supportId;

  const { error } = passwordValidation(req.body);
  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  if (req.body.password !== req.body.password2) {
    return res.status(400).json({ error: "Passwords not matching." });
  }

  const updates = Object.keys(req.body);

  const allowUpdates = ["password", "password2"];

  const isValidOperation = updates.every((update) =>allowUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Operation" });
  }

  try {
    
    const existingSupport = await Support.findOne({ _id: supportId });
    if (!existingSupport) {
      return res.status(404).json({ error: "Manager does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingSupport[key] && existingSupport[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedSupport = await Support.updateOne({ _id: supportId }, query);
    res.status(200).json({ message: "Password updated Successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSupportAccount = async (req, res) => {

  const supportId = req.params.supportId

  try {
    
    const existingSupport = await Support.findOne({ _id: supportId });

    if (!existingSupport) {
      return res.status(404).json({ error: "Support does not exist" });
    }

    await existingSupport.remove();
    res.status(200).json({ message: "Support Account Deleted" });

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
};
