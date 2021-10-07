const router = require("express").Router();

const {
  createStaffDocument,
  viewAllDocuments,
  viewStaffDocument,
  findDocumentByStaffId,
  findDocumentById,
  updateDocumentId,
  updateDocumentByStaffId,
  deleteByDocumentId,
  deleteByStaffId,
} = require("../../controllers/administration/staffdoc");

router.post("/create/:staffId", createStaffDocument);

router.get("/view/all", viewAllDocuments);

router.get("/view/", viewStaffDocument);

router.get("/view/:staffId", findDocumentByStaffId);

router.get("/view/document/:documentId", findDocumentById);

router.post("/update/:documentId", updateDocumentId);

router.post("/update/document/:staffId", updateDocumentByStaffId);

router.get("/delete/:documentId", deleteByDocumentId);

router.get("/delete/document/:staffId", deleteByStaffId);

module.exports = router;
