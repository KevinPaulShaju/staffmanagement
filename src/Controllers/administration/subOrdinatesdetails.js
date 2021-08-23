const HResources = require("../../Models/administration/HResources");
const Finance = require("../../Models/administration/Finance");
const Manager = require("../../Models/administration/Manager");
const Support = require("../../Models/administration/Support");
const Carer = require("../../Models/administration/carer");

exports.hrDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findHR = await HResources.findOne({ _id }).select("-password");
    if (!findHR) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: findHR });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.financeDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findFinance = await Finance.findOne({ _id }).select("-password");
    if (!findFinance) {
      return res.status(404).json({ error: "Finance not found" });
    }

    res.status(200).json({ message: findFinance });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.managerDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findManager = await Manager.findOne({ _id }).select("-password");
    if (!findManager) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: findManager });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.supportDetails = async (req, res) => {
  try {
    const _id = req.user.id;
    const findSupport = await Support.findOne({ _id }).select("-password");
    if (!findSupport) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ message: findSupport });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// add controller to show carer profile

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
