const DocType = require("../../models/administration/docList");

exports.createDocType = async (req, res) => {
  try {
    const { documentType } = req.body;
    if (!documentType) {
      return res.status(406).json({ error: "Input cant be empty" });
    }

    const documentTypeExists = await DocType.findOne({
      documentType: documentType,
    });
    if (documentTypeExists) {
      return res
        .status(406)
        .json({ error: "This document type already exists" });
    }

    const newDocType = new DocType({ documentType: documentType });
    const savedDocType = await newDocType.save();
    res.status(200).json({
      message: "Document type saved successfully",
      document: savedDocType,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDocType = async (req, res) => {
  const docTypeId = req.params.docTypeId;
  try {
    const { documentType } = req.body;
    if (!documentType) {
      return res.status(406).json({ error: "Input cant be empty" });
    }

    const documentTypeExists = await DocType.findOne({
      _id: docTypeId,
    });
    if (!documentTypeExists) {
      return res
        .status(406)
        .json({ error: "This document type does not exist" });
    }

    const query = { $set: req.body };
    const updatedDocType = await DocType.findOneAndUpdate(
      { _id: docTypeId },
      query,
      { new: true }
    );
    res.status(200).json({
      message: "Document type updated successfully",
      updatedDocument: updatedDocType,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewDocType = async (req, res) => {
  const docTypeId = req.params.docTypeId;

  try {
    const documentTypeExists = await DocType.findOne({
      _id: docTypeId,
    });
    if (!documentTypeExists) {
      return res
        .status(406)
        .json({ error: "This document type does not exist" });
    }

    res.status(200).json({ document: documentTypeExists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.viewAllDocTypes = async (req, res) => {
  try {
    const documentTypes = await DocType.find();
    if (!documentTypes || documentTypes.length === 0) {
      return res.status(406).json({ error: "No documents found" });
    }
    res.status(200).json({ document: documentTypes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDocType = async (req, res) => {
  const docTypeId = req.params.docTypeId;

  try {
    const documentTypeExists = await DocType.findOne({
      _id: docTypeId,
    });
    if (!documentTypeExists) {
      return res
        .status(406)
        .json({ error: "This document type does not exist" });
    }

    await documentTypeExists.remove();
    res
      .status(200)
      .json({ message: "Document type has been removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
