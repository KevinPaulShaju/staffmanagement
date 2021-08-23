const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const { managementAuth } = require("../../middlewares/manageStaffAuth");

const {
  deleteHrAccount,
  deleteManagerAccount,
  deleteFinanceAccount,
  deleteSupportAccount,
  deleteCarerAccount,
} = require("../../Controllers/administration/deleteSubordinatesaccount");

/**
 * @description  delete hr account
 * @method GET /:hrId
 * **/
router.get("/hr/:hrId", ensureAdmin, deleteHrAccount);

router.get("/manager/:managerId", ensureAdmin, deleteManagerAccount);

router.get("/finance/:financeId", managementAuth, deleteFinanceAccount);

router.get("/support/:supportId", managementAuth, deleteSupportAccount);

router.get("/carer/:carerId", managementAuth, deleteCarerAccount);

module.exports = router;
