const UserReport = require("../../models/user/reportuser");
const User = require("../../models/user/user");

exports.createUserReport = async (req, res) => {
  const carerId = req.query.carerId;
  const userId = req.query.userId;

  if (!carerId || !userId) {
    return res.status(400).json({ error: "Both user and Carer must be defined" });
  }

  const { report } = req.body;
  if (!report) {
    return res.status(400).json({ error: "Fields can not be left empty" });
  }

  try {
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ error: "This user does not exist" });
    }
    const carerExists = await Carer.findOne({ _id: carerId });
    if (!carerExists) {
      return res.status(404).json({ error: "This carer does not exist" });
    }

    const newReport = new UserReport({ endUserId: userId, carerId, report });
    const savedReport = await newReport.save();
    res
      .status(200)
      .json({ message: "Report added successfully", report: savedReport });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateReport = async (req, res) => {
  const reportId = req.params.reportId;

  if (!reportId) {
    return res.status(400).json({ error: "Report must be defined" });
  }

  const { report } = req.body;
  if (!report) {
    return res.status(400).json({ error: "Fields can not be left empty" });
  }

  try {
    const reportExists = await UserReport.findOne({ _id: reportId });
    if (!reportExists) {
      return res.status(404).json({ error: "This report does not exist" });
    }

    let query = { $set: { report } };
    const updatedReport = await UserReport.findOneAndUpdate(
      { _id: reportId },
      query,
      { new: true }
    );

    res.status(200).json({
      message: "Report has been updated Successfully",
      report: updatedReport,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewReport = async (req, res) => {
  const reportId = req.params.reportId;

  if (!reportId) {
    return res.status(400).json({ error: "Report must be defined" });
  }
  try {
    const report = await UserReport.findOne({ _id: reportId });
    if (!report) {
      return res.status(404).json({ error: "This report does not exist" });
    }
    res.status(200).json({ report: report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewAllReports = async (req, res) => {
  try {
    const reports = await UserReport.find();
    if (!reports || reports.length === 0) {
      return res.status(404).json({ error: "No reports found" });
    }
    res.status(200).json({ reports: reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewReportsByCarer = async (req, res) => {
  const carerId = req.params.carerId;

  try {
    const reports = await UserReport.find({ carerId: carerId });

    if (!reports || reports.length === 0) {
      return res.status(404).json({ error: "No reports found" });
    }
    res.status(200).json({ reports: reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewReportsByUser = async (req, res) => {
  const endUserId = req.params.userId;

  try {
    const reports = await UserReport.find({ endUserId: endUserId });
    if (!reports || reports.length === 0) {
      return res.status(404).json({ error: "No reports found" });
    }
    res.status(200).json({ reports: reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteReport = async (req, res) => {
  const reportId = req.params.reportId;

  try {
    const reportExists = await UserReport.findOne({ _id: reportId });
    if (!reportExists) {
      return res.status(404).json({ error: "Report does not exist" });
    }
    await reportExists.remove();
    res.status(200).json({ message: "Report has been removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
