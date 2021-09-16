const router = require('express').Router();


const {
    createCarerDocument,
    viewAllDocuments,
    viewCarerDocument,
    findDocumentByCarerId,
    findDocumentById,
    updateDocumentId,
    updateDocumentByCarerId,
    deleteByDocumentId,
    deleteByCarerId
} = require('../../controllers/administration/carerdoc')


router.post("/create/:carerId",createCarerDocument);

router.get("/view/all",viewAllDocuments);

router.get("/view/",viewCarerDocument);

router.get("/view/:carerId",findDocumentByCarerId);

router.get("/view/document/:documentId",findDocumentById);

router.post("/update/:documentId",updateDocumentId);

router.post("/update/document/:carerId",updateDocumentByCarerId);

router.get("/delete/:documentId",deleteByDocumentId);

router.get("/delete/document/:carerId",deleteByCarerId);

module.exports = router;