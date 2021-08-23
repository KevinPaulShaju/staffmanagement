const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const { managementAuth } = require("../../middlewares/manageStaffAuth");

const {
  updateHrPasswords,
  updateManagerPasswords,
  updateSupportPasswords,
  updateFinancePasswords,
  updateCarerPasswords,
} = require("../../Controllers/administration/updateSubordinatepassword");

/**
 * @description  update hr passwords
 * @method POST /staff/:staffId
 * **/
router.post("/hr/:hrId", ensureAdmin, updateHrPasswords);

router.post("/manager/:managerId", ensureAdmin, updateManagerPasswords);

router.post("/finance/:financeId", managementAuth, updateFinancePasswords);

router.post("/support/:supportId", managementAuth, updateSupportPasswords);

router.post("/carer/:carerId", managementAuth, updateCarerPasswords);

module.exports = router;
