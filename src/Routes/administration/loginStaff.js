const express = require("express");
const router = express.Router();
const {
  hrLogin,
  managerLogin,
  financeLogin,
  supportLogin,
  carerLogin,
} = require("../../Controllers/administration/subOrdinateslogin");

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
