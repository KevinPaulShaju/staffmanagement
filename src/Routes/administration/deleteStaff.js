const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const {
  manageFinance,
  manageSupport,
  manageCarer,
} = require("../../middlewares/manageStaffAuth");

const {
  deleteHrAccount,
  deleteManagerAccount,
  deleteFinanceAccount,
  deleteSupportAccount,
} = require("../../Controllers/administration/deleteSubordinatesaccount");
const {
  deleteCarerAccount,
} = require("../../Controllers/administration/carer");

/**
 * @description  delete hr account
 * @method GET /:hrId
 * **/
router.get("/hr/:hrId", ensureAdmin, deleteHrAccount);

router.get("/manager/:managerId", ensureAdmin, deleteManagerAccount);

router.get("/finance/:financeId", manageFinance, deleteFinanceAccount);

router.get("/support/:supportId", manageSupport, deleteSupportAccount);

router.get("/carer/:carerId", manageCarer, deleteCarerAccount);

module.exports = router;
