const express = require("express");
const router = express.Router();
const Document = require("../../models/administration/StaffDoc");
const Staff = require("../../models/administration/staff");

const { s3, staffDocuments } = require("../../helpers/photo");

// to add a document
router.post(
  "/add/:staffId",
  staffDocuments.single("document"),
  async (req, res) => {
    console.log(process.env.SECERET_ACCESS_KEY);
    const _id = req.params.staffId;
    const findStaff = await Staff.findOne({ _id });
    if (!findStaff) {
      return res.status(400).json({ error: "Staff Not Found." });
    }
    const { docType, docNumber, docExpiryDate } = req.body;
    if (!docType || !docNumber || !req.file || !docExpiryDate) {
      return res.status(400).json({ error: "All The Fields are required." });
    }

    const newDocument = new Document({
      StaffId: _id,
      docType,
      url: req.file.location,
      docNumber,
      docExpiryDate,
      docUploadDate: new Date(),
    });
    const savedDocument = await newDocument.save();
    res
      .status(200)
      .json({ message: "Document Inserted", document: savedDocument });
  },
  (err, req, res, next) => {
    return res.status(400).json({ error: err.message });
  }
);

//view all documents of a staff
router.get("/view/all/documents/:staffId", async (req, res) => {
  try {
    const _id = req.params.staffId;
    const findStaff = await Staff.findOne({ _id });
    if (!findStaff) {
      return res.status(400).json({ error: "Staff Not Found" });
    }
    const findDocuments = await Document.find({ StaffId: _id });
    if (findDocuments.length === 0) {
      return res
        .status(404)
        .json({ error: "No Documents Found for this user." });
    }
    res.status(200).json({ message: findDocuments });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// to view a specific document
router.get("/view/document/:documentId", async (req, res) => {
  try {
    const _id = req.params.documentId;
    const findDocument = await Document.findOne({ _id });
    if (!findDocument) {
      return res.status(404).json({ error: "Document Not Found" });
    }
    res.status(200).json({ message: findDocument });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post(
  "/update/document/:documentId",
  staffDocuments.single("document"),
  async (req, res) => {
    const { docNumber, docType, docExpiryDate } = req.body;
    const _id = req.params.documentId;
    const findDocument = await Document.findOne({ _id });
    if (!findDocument) {
      return res.status(404).json({ error: "Document Not Found" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Field is Mandatory" });
    }

    if (findDocument.url !== null) {
      const staffDocument = findDocument.url;
      var fields = staffDocument.split("/");
      const documentStaff = fields[fields.length - 1];

      var params = { Bucket: "staff-document", Key: documentStaff };
      s3.deleteObject(params, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
      });

      findDocument.url = req.file.location;
      findDocument.docNumber = docNumber;
      findDocument.docType = docType;
      findDocument.docExpiryDate = docExpiryDate;
      findDocument.docUploadDate = new Date();
      await findDocument.save();
      return res
        .status(200)
        .json({ message: "Document Saved", file: findDocument.url });
    }

    res.status(200).json({ error: "This Document Does not hv a file." });
  },
  (err, req, res, next) => {
    return res.status(400).json({ error: err.message });
  }
);

router.get("/delete/document/:documentId", async (req, res) => {
  try {
    const _id = req.params.documentId;
    const findDocument = await Document.findOne({ _id });
    if (!findDocument) {
      return res.status(404).json({ error: "Document Not Found" });
    }
    if (findDocument.url !== null) {
      const staffDocument = findDocument.url;
      var fields = staffDocument.split("/");
      const documentStaff = fields[fields.length - 1];

      var params = { Bucket: "staff-document", Key: documentStaff };
      s3.deleteObject(params, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
      });

      await findDocument.remove();
      return res.status(200).json({ message: "Document Removed" });
    }

    await findDocument.remove();
    res.status(200).json({ message: "Document Removed" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
