const express = require("express");
const router = express.Router();
const {
  updateHrDetails,
  updateManagerDetails,
  updateFinanceDetails,
  updateSupportDetails,
  updateCarerDetails,
} = require("../../Controllers/administration/updateSubordinatesDetails");

const { managementAuth } = require("../../middlewares/manageStaffAuth");
const { ensureAdmin } = require("../../middlewares/commonAuth");

/**
 * @description  update staff details details
 * @method POST /staff/:staffId
 * **/
router.post("/hr/:hrId", ensureAdmin, updateHrDetails);
router.post("/manager/:managerId", ensureAdmin, updateManagerDetails);
router.post("/finance/:financeId", managementAuth, updateFinanceDetails);
router.post("/support/:supportId", managementAuth, updateSupportDetails);
router.post("/support/:carerId", managementAuth, updateCarerDetails);

module.exports = router;
