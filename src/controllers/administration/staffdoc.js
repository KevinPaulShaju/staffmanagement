const StaffDoc = require("../../models/administration/StaffDoc");
const Staff = require("../../models/administration/staff");

exports.createStaffDocument = async (req, res) => {
  const _id = req.params.staffId;

  if (!_id) {
    return res.status(400).json({ error: "Staff id should be provided" });
  }

  const { docType, docNumber, docExpiryDate } = req.body;

  if (!docType || !docNumber || !docExpiryDate) {
    return res.status(400).json({ error: "All Fields are required" });
  }

  try {
    const findStaff = await Staff.findOne({ _id });
    const findDocument = await StaffDoc.findOne({ staffId: _id });

    if (!findStaff) {
      return res.status(404).json({ error: "Staff does not exist" });
    }

    if (findDocument) {
      return res
        .status(400)
        .json({ message: "Staff Document is Added Already." });
    }

    const newDoc = new StaffDoc({
      staffId: _id,
      ...req.body,
    });
    const savedDocument = await newDoc.save();
    findStaff.status = "active";
    await findStaff.save();

    res.status(201).json({
      message: "Document Inserted Successfully",
      result: savedDocument,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.viewAllDocuments = async (req, res) => {
  try {
    const findDocuments = await StaffDoc.find();

    if (findDocuments.length === 0) {
      return res.status(200).json({ message: "No Documents Available." });
    }

    res.status(200).json({ message: findDocuments });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.viewStaffDocument = async (req, res) => {
  try {
    const staffId = req.query.staffId;
    const _id = req.query.documentId;

    if (!staffId || !_id) {
      return res
        .status(400)
        .json({ message: "Both Staff Id & Document Id are required" });
    }

    const findStaff = await Staff.findOne({ _id: staffId });
    const findDocument = await StaffDoc.findOne({ _id, staffId });
    console.log(findDocument);

    if (!findStaff) {
      return res.status(404).json({ message: "No Staff found." });
    }

    if (!findDocument) {
      return res.status(404).json({ message: "No Document Found." });
    }

    res.status(200).json({ message: findDocument });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.findDocumentByStaffId = async (req, res) => {
  try {
    const _id = req.params.staffId;
    if (!_id) {
      return res.status(400).json({ message: "Staff Id Required" });
    }
    const findStaff = await Staff.findOne({ _id });
    const findDocument = await StaffDoc.findOne({ staffId: _id });

    if (!findStaff) {
      return res.status(404).json({ message: "Staff Not Found" });
    }

    if (findStaff && !findDocument) {
      return res
        .status(404)
        .json({ message: "Document Not Registered With This Staff." });
    }

    res.status(200).json({ message: findDocument });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.findDocumentById = async (req, res) => {
  try {
    const _id = req.params.documentId;
    if (!_id) {
      return res.status(400).json({ error: "Document Id Required" });
    }
    const findDocument = await StaffDoc.findOne({ _id });
    if (!findDocument) {
      return res.status(404).json({ error: "Document Not Found" });
    }
    res.status(200).json({ message: findDocument });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.updateDocumentId = async (req, res) => {
  const { docType, docNumber, docExpiryDate } = req.body;
  try {
    const _id = req.params.documentId;
    if (!_id) {
      return res.status(400).json({ error: "Document Id Required" });
    }

    const findDocuments = await StaffDoc.findOne({ _id });
    if (!findDocuments) {
      return res.status(404).json({ error: "Document Not Found" });
    }
    let query = {
      $set: req.body,
    };
    const updateDocument = await StaffDoc.findOneAndUpdate({ _id }, query, {
      new: true,
    });
    res.status(200).json({
      message: "Document has been updated successfully",
      result: updateDocument,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.updateDocumentByStaffId = async (req, res) => {
  const { docType, docNumber, docExpiryDate } = req.body;
  try {
    const staffId = req.params.staffId;
    if (!staffId) {
      return res.status(400).json({ error: "Staff Id not specified" });
    }
    const findStaff = await Staff.findOne({ _id: staffId });
    const findDocument = await StaffDoc.findOne({ staffId });
    if (!findStaff) {
      return res.status(404).json({ error: "Staff Not Found" });
    }
    if (findStaff && !findDocument) {
      return res
        .status(404)
        .json({ error: "This Staff Does not have Document." });
    }
    let query = {
      $set: req.body,
    };
    const updateDocument = await StaffDoc.findOneAndUpdate({ staffId }, query, {
      new: true,
    });
    res.status(200).json({
      message: "Document has been updated successfully",
      result: updateDocument,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.deleteByDocumentId = async (req, res) => {
  try {
    const _id = req.params.documentId;
    if (!_id) {
      return res.status(400).json({ error: "Document Id Required" });
    }

    const findDocuments = await StaffDoc.findOne({ _id });
    if (!findDocuments) {
      return res.status(404).json({ error: "Document Not Found" });
    }
    const removedDocument = await findDocuments.remove();
    res.status(200).json({ message: "Document removed successfully" });
  } catch (error) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};

exports.deleteByStaffId = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    if (!staffId) {
      return res.status(400).json({ error: "Staff Id not specified" });
    }
    const findStaff = await Staff.findOne({ _id: staffId });
    const findDocument = await StaffDoc.findOne({ staffId });
    if (!findStaff) {
      return res.status(404).json({ error: "Staff Not Found" });
    }
    if (findStaff && !findDocument) {
      return res
        .status(404)
        .json({ error: "This Staff Does not have Document." });
    }
    const removedDocument = await findDocument.remove();
    res.status(200).json({ message: "Document Removed" });
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Internal Server Error",
    });
  }
};
