const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  userValidation,
  updateValidation,
  passwordValidation,
} = require("../../Services/validation");

const Finance = require("../../Models/administration/Finance");

exports.createFinance = async (req, res) => {
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
    const existingFinance = await Finance.findOne({ email: email });
    if (existingFinance) {
      return res.status(406).json({ error: "This Finance already exists." });
    }

    // confirming passwords
    if (password !== password2) {
      return res.status(406).json({ error: "Passwords do not match." });
    }

    const newFinance = new Finance(req.body);
    const savedFinance = await newFinance.save();
    res
      .status(200)
      .json({ message: `Finance staff has been successfully registered.` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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


exports.financeDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findFinance = await Finance.findOne({ _id }).select("-password");
    if(!findFinance) {
      return res.status(404).json({ error: 'Finance not found' });
    }

    res.status(200).json({message: findFinance});

  } catch (e) {
    res.status(500).json({error: e.message});
  }
}

exports.updateFinanceDetails = async (req, res) => {
  const financeId = req.params.financeId;
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
    const existingFinance = await Finance.findOne({ _id: financeId });

    if (!existingFinance) {
      return res.status(404).json({ error: "Finance does not exist" });
    }

    //   query
    let query = { $set: {} };

    for (let key in req.body) {
      if (existingFinance[key] && existingFinance[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedFinance = await Finance.updateOne({ _id: financeId }, query);
    res.status(200).json({ message: "Update Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFinancePasswords = async (req, res) => {
  const financeId = req.params.financeId;

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
    const existingFinance = await Finance.findOne({ _id: financeId });
    if (!existingFinance) {
      return res.status(404).json({ error: "Finance does not exist" });
    }

    const password = req.body.password;
    if (password) {
      const hashedPass = await bcrypt.hash(password, 10);
      req.body.password = hashedPass;
    }

    //   query
    let query = { $set: {} };
    for (let key in req.body) {
      if (existingFinance[key] && existingFinance[key] !== req.body[key])
        // if the field we have in req.body exists, we're gonna update it
        query.$set[key] = req.body[key];
    }

    const updatedFinance = await Finance.updateOne({ _id: financeId }, query);
    res.status(200).json({ message: "Password updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFinanceAccount = async (req, res) => {
  const financeId = req.params.financeId;

  try {
    const existingFinance = await Finance.findOne({ _id: financeId });

    if (!existingFinance) {
      return res.status(404).json({ error: "Finance does not exist" });
    }

    await existingFinance.remove();
    res.status(200).json({ message: "Finance Account Deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
