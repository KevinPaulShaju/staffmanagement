const express = require("express");
const router = express.Router();
const {
  hrLogin,
  managerLogin,
  financeLogin,
  supportLogin,
} = require("../../Controllers/administration/subOrdinateslogin");
const { carerLogin } = require("../../Controllers/administration/carer");

/**
 * @description   staffs login
 * @method POST /staffRole/login
 * **/

router.post("/hr", hrLogin);
router.post("/manager", managerLogin);
router.post("/finance", financeLogin);
router.post("/support", supportLogin);
router.post("/carer", carerLogin);

module.exports = router;
