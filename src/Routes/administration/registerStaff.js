const express = require("express");
const router = express.Router();

const {
  manageFinance,
  manageSupport,
  manageCarer,
} = require("../../middlewares/manageStaffAuth");

const { ensureAdmin } = require("../../middlewares/commonAuth");

const {
  createHr,
  createManager,
  createFinance,
  createSupport,
} = require("../../Controllers/administration/createSubordinates");
const { registerCarer } = require("../../Controllers/administration/carer");

/**
 * @description  register staffs
 * @method POST /register/staffRole
 * **/

router.post("/hr", ensureAdmin, createHr);

router.post("/manager", ensureAdmin, createManager);

router.post("/finance", manageFinance, createFinance);

router.post("/support", manageSupport, createSupport);

router.post("/carer", manageCarer, registerCarer);

module.exports = router;
