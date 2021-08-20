const express = require("express");
const router = express.Router();
const {
  updateHrDetails,
  updateManagerDetails,
  updateFinanceDetails,
  updateSupportDetails,
} = require("../../Controllers/administration/updateSubordinatesDetails");

const {
  manageFinance,
  manageSupport,
  manageCarer,
} = require("../../middlewares/manageStaffAuth");
const { ensureAdmin } = require("../../middlewares/commonAuth");

/**
 * @description  update staff details details
 * @method POST /staff/:staffId
 * **/
router.post("/hr/:hrId", ensureAdmin, updateHrDetails);
router.post("/manager/:managerId", ensureAdmin, updateManagerDetails);
router.post("/finance/:financeId", manageFinance, updateFinanceDetails);
router.post("/support/:supportId", manageSupport, updateSupportDetails);

module.exports = router;
