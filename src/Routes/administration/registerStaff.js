const express = require("express");
const router = express.Router();

const { managementAuth } = require("../../middlewares/manageStaffAuth");

const {
  ensureAdmin,
  ensureCarer
} = require("../../middlewares/commonAuth");

const {createCarerDoc} = require("../../Controllers/administration/carerdoc");

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

router.post("/carer/insert/document/:carerId", ensureCarer ,createCarerDoc);

module.exports = router;
