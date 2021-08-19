const express = require("express");
const router = express.Router();
const { ensureSupport } = require("../../middlewares/auth");

const {
  createSupport,
  supportLogin,
  updateSupportDetails,
  updateSupportPasswords,
  deleteSupportAccount,
  supportDetails,
} = require("../../Controllers/administration/support");

/**
 * @description create a new support
 * @method POST /register
 * **/
router.post("/register", createSupport);

/**
 * @description  support login
 * @method POST /login
 * **/
router.post("/login", supportLogin);

/**
 * @description  update suport details
 * @method POST /update/details/:supportId
 * **/
router.post("/update/details/:supportId", ensureSupport, updateSupportDetails);

/**
 * @description  view manager profile
 * @method GET /view
 * **/
router.get("/view", ensureSupport, supportDetails);

/**
 * @description  update support passwords
 * @method POST /update/passwords/:supportId
 * **/

router.post(
  "/update/passwords/:supportId",
  ensureSupport,
  updateSupportPasswords
);

/**
 * @description  delete support account
 * @method GET /account/delete/:supportId
 * **/
router.get("/account/delete/:supportId", ensureSupport, deleteSupportAccount);

module.exports = router;
