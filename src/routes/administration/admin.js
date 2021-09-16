const express = require("express");
const router = express.Router();
const {
  createAdmin,
  adminLogin,
  updateAdminDetails,
  updateAdminPasswords,
  deleteadminAccount,
  adminProfile,
} = require("../../controllers/administration/admin");

const { authenticateAdmin } = require("../../middlewares/auth");

/**
 * @description create admin accounts
 * @method POST
 * @route /admin/register
 **/

router.post("/register", createAdmin);

/**
 * @description admin login
 * @method POST
 * @route /admin/login
 **/

router.post("/login", adminLogin);

/**
 * @description update admin details
 * @method POST
 * @route /update/details/:adminId
 **/

router.post("/update/details/:adminId", authenticateAdmin, updateAdminDetails);

/**
 * @description update admin password
 * @method POST
 * @route /update/password/:adminId
 **/

router.post(
  "/update/password/:adminId",
  authenticateAdmin,
  updateAdminPasswords
);

/**
 * @description delete admin account
 * @method GET
 * @route /update/password/:adminId
 **/

router.get("/delete/account/:adminId", authenticateAdmin, deleteadminAccount);

/**
 * @description view admin profile
 * @method GET
 * @route /view/profile/:adminId
 **/

router.get("/view/profile/:adminId", authenticateAdmin, adminProfile);

module.exports = router;
