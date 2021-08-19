const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/auth");
const {
  viewHrs,
  viewFinance,
  viewManagers,
  viewSupports,
} = require("../../Controllers/administration/viewSubordinates");
const {
  adminLogin,
  registerAdmin,
  updateAdminDetails,
  updateAdminPasswords,
  deleteAdminAccount,
  adminDetails,
} = require("../../Controllers/administration/admin");

/**
 * @description create a new admin
 * @method POST /register
 * **/
router.post("/register", registerAdmin);

/**
 * @description  admin login
 * @method POST /login
 * **/
router.post("/login", adminLogin);

/**
 * @description  view admin details
 * @method GET /view
 * **/
router.get("/view", ensureAdmin, adminDetails);

/**
 * @description  update admin details
 * @method POST /update
 * **/
router.post("/update/details", ensureAdmin, updateAdminDetails);

/**
 * @description  update admin passwords
 * @method POST /update
 * **/
router.post("/update/passwords", ensureAdmin, updateAdminPasswords);

/**
 * @description  delete admin account
 * @method GET /update
 * **/
router.get("/account/delete", ensureAdmin, deleteAdminAccount);

/**
 * @description  to view all the HRS
 * @method GET /view/hr
 * **/
router.get("/view/hr", ensureAdmin, viewHrs);

/**
 * @description  to view all the managers
 * @method GET /view/managers
 * **/
router.get("/view/managers", ensureAdmin, viewManagers);

/**
 * @description  to view all the finance
 * @method GET /view/finance
 * **/
router.get("/view/finance", ensureAdmin, viewFinance);

/**
 * @description  to view all the supports
 * @method GET /view/supports
 * **/
router.get("/view/supports", ensureAdmin, viewSupports);

module.exports = router;
