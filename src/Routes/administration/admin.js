const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/auth");
const {
  viewHrs,
  viewFinance,
  viewManagers,
  viewSupports
} = require("../../Controllers/administration/viewSubordinates");
const {
  adminLogin,
  registerAdmin,
  updateAdminDetails,
  updateAdminPasswords,
  deleteAdminAccount,
  adminDetails
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


router.get("/view", ensureAdmin ,adminDetails);


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

// to view all the HRS
router.get("/view/hr",ensureAdmin,viewHrs);

// to view all the Finance
router.get("/view/finance",ensureAdmin,viewFinance);

// to view all the Managers
router.get("/view/managers",ensureAdmin, viewManagers);

// to view all the Supports
router.get("/view/supports",ensureAdmin, viewSupports);

module.exports = router;
