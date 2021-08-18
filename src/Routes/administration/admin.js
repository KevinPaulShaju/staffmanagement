const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middlewares/auth");
const {
  adminLogin,
  registerAdmin,
  updateAdminDetails,
  updateAdminPasswords,
  deleteAdminAccount
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
 * @description  update admin details
 * @method POST /update
 * **/

router.post("/update/details", ensureAuthenticated, updateAdminDetails);

/**
 * @description  update admin passwords
 * @method POST /update
 * **/

 router.post("/update/passwords", ensureAuthenticated, updateAdminPasswords);

 /**
 * @description  delete admin account
 * @method GET /update
 * **/

 router.get("/account/delete",ensureAuthenticated,deleteAdminAccount);

module.exports = router;
