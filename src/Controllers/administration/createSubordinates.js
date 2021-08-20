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
const Carer = require("../../Models/administration/carer");


//Create HR
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


exports.createManager = async (req, res) => {
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
      
      const existingManager = await Manager.findOne({ email:email });
      if (existingManager) {
        return res.status(406).json({ error: "This Manager already exists." });
      }
  
      // confirming passwords
      if (password !== password2) {
        return res.status(406).json({ error: "Passwords do not match." });
      }
  
      const newManager= new Manager(req.body);
      const savedManager= await newManager.save();
      res.status(200).json({message: `Manager staff has been successfully registered.`,});
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  
};

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
  