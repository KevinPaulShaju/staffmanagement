const express = require("express");
const router = express.Router();
const {
  hrDetails,
  financeDetails,
  managerDetails,
  supportDetails,
} = require("../../Controllers/administration/subOrdinatesdetails");

const { carerDetails } = require("../../Controllers/administration/carer");

/**
 * @description  view staff profile
 * @method GET staff/view
 * **/
router.get("hr/view/:hrId", hrDetails);
router.get("manager/view/:managerId", managerDetails);
router.get("finance/view/:financeId", financeDetails);
router.get("support/view/:supportId", supportDetails);
router.get("carer/view/:carerId", carerDetails);

module.exports = router;
