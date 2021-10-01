const Brokerage = require("../../models/administration/brokerage");

exports.createBrokerage = async (req, res) => {
  try {
    const existingBrokerage = await Brokerage.findOne({ name: req.body.name });
    if (existingBrokerage) {
      return res.status(500).json({ message: "This Brokerage already exists" });
    }
    const newBrokerage = new Brokerage(req.body);
    const savedBrokerage = await newBrokerage.save();
    res.status(200).json({
      message: "Brokerage has been saved successfully",
      brokerage: savedBrokerage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBrokerage = async (req, res) => {
  const id = req.params.brokerageId;
  try {
    const existingBrokerage = await Brokerage.findOne({ _id: id });
    if (!existingBrokerage) {
      return res.status(500).json({ message: "This Brokerage does not exist" });
    }
    const query = { $set: req.body };
    const updatedBrokerage = await Brokerage.findOneAndUpdate(
      { _id: id },
      query
    );
    res.status(200).json({
      message: "Brokerage has been updated successfully",
      brokerage: updatedBrokerage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewBrokerage = async (req, res) => {
  try {
    const id = req.params.brokerageId;
    const existingBrokerage = await Brokerage.findOne({ _id: id });
    if (!existingBrokerage) {
      return res.status(500).json({ message: "This Brokerage does not exist" });
    }
    res.status(200).json({ brokerage: existingBrokerage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewAllBrokerage = async (req, res) => {
  try {
    const existingBrokerage = await Brokerage.find();
    if (!existingBrokerage || existingBrokerage.length === 0) {
      return res.status(500).json({ message: "No brokerages found" });
    }
    res.status(200).json({ brokerage: existingBrokerage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBrokerage = async (req, res) => {
  const id = req.params.brokerageId;
  try {
    const existingBrokerage = await Brokerage.findOne({ _id: id });
    if (!existingBrokerage || existingBrokerage.length === 0) {
      return res.status(500).json({ message: "This Brokerage does not exist" });
    }
    await existingBrokerage.remove();
    res.status(200).json({ message: "This Brokerage has been removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
