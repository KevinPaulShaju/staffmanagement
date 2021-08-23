const express = require("express");
const router = express.Router();

const { managementAuth } = require("../../middlewares/manageStaffAuth");

const { ensureAdmin } = require("../../middlewares/commonAuth");

const {
  createHr,
  createManager,
  createFinance,
  createSupport,
  registerCarer,
} = require("../../Controllers/administration/createSubordinates");

/**
 * @description  register staffs
 * @method POST /register/staffRole
 * **/

router.post("/hr", ensureAdmin, createHr);

router.post("/manager", ensureAdmin, createManager);

router.post("/finance", managementAuth, createFinance);

router.post("/support", managementAuth, createSupport);

router.post("/carer", managementAuth, registerCarer);

module.exports = router;
