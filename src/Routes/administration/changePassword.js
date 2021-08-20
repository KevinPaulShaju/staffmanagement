const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const {
  manageFinance,
  manageSupport,
  manageCarer,
} = require("../../middlewares/manageStaffAuth");

const {
  updateHrPasswords,
  updateManagerPasswords,
  updateSupportPasswords,
  updateFinancePasswords,
} = require("../../Controllers/administration/updateSubordinatepassword");

const {
  updateCarerPasswords,
} = require("../../Controllers/administration/carer");

/**
 * @description  update hr passwords
 * @method POST /staff/:staffId
 * **/
router.post("/hr/:hrId", ensureAdmin, updateHrPasswords);

router.post("/manager/:managerId", ensureAdmin, updateManagerPasswords);

router.post("/finance/:financeId", manageFinance, updateFinancePasswords);

router.post("/support/:supportId", manageSupport, updateSupportPasswords);

router.post("/support/:carerId", manageCarer, updateCarerPasswords);

module.exports = router;
