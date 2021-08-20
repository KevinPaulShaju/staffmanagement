const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const {
  manageFinance,
  manageSupport,
  manageCarer,
} = require("../../middlewares/manageStaffAuth");

const {
  viewHrs,
  viewManagers,
  viewFinance,
  viewSupports,
} = require("../../Controllers/administration/viewSubordinates");
// const {} = require("../../Controllers/administration/carer");

/**
 * @description  to view all staffs by role
 * @method GET /role
 * **/
router.get("/hr", ensureAdmin, viewHrs);

router.get("/managers", ensureAdmin, viewManagers);

router.get("/finance", manageFinance, viewFinance);

router.get("/supports", manageSupport, viewSupports);

// router.get("/view/carer", manageCarer, viewSupports);

module.exports = router;
