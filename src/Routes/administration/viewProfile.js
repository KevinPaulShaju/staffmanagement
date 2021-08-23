const express = require("express");
const router = express.Router();

const {viewCarerDocs} = require("../../Controllers/administration/carerdoc");


const {
  hrDetails,
  financeDetails,
  managerDetails,
  supportDetails,
  carerDetails,
} = require("../../Controllers/administration/subOrdinatesdetails");
const {
  ensureHr,
  ensureManager,
  ensureFinance,
  ensureSupport,
  ensureCarer,
} = require("../../middlewares/commonAuth");

/**
 * @description  view staff profile
 * @method GET staff/view
 * **/
router.get("hr/view/:hrId", ensureHr, hrDetails);
router.get("manager/view/:managerId", ensureManager, managerDetails);
router.get("finance/view/:financeId", ensureFinance, financeDetails);
router.get("support/view/:supportId", ensureSupport, supportDetails);
router.get("carer/view/:carerId", ensureCarer, carerDetails);

router.get("/carer/document/:carerId", ensureCarer , viewCarerDocs);

module.exports = router;
