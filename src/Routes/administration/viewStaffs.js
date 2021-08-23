const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const { managementAuth } = require("../../middlewares/manageStaffAuth");

const {
  viewHrs,
  viewManagers,
  viewFinance,
  viewSupports,
  viewCarer,
} = require("../../Controllers/administration/viewSubordinates");
// const {} = require("../../Controllers/administration/carer");

/**
 * @description  to view all staffs by role
 * @method GET /role
 * **/
router.get("/hr", ensureAdmin, viewHrs);

router.get("/managers", ensureAdmin, viewManagers);

router.get("/finance", managementAuth, viewFinance);

router.get("/supports", managementAuth, viewSupports);

router.get("/carer", managementAuth, viewCarer);

// router.get("/view/carer", manageCarer, viewSupports);

module.exports = router;
