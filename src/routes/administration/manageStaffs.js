const express = require("express");
const router = express.Router();
const {
  createStaff,
  staffLogin,
  updateStaffDetails,
  updateStaffPasswords,
  deletestaffAccount,
  viewStaff,
  staffProfile,
} = require("../../controllers/administration/manageStaff");

const { authenticateUser } = require("../../middlewares/auth");

/**
 * @description create staff accounts
 * @method POST
 * @route /staff/register?role=role
 **/

router.post("/register", authenticateUser, createStaff);

/**
 * @description staff login
 * @method POST
 * @route /staff/login?role=role
 **/

router.post("/login", staffLogin);

/**
 * @description update staff details
 * @method POST
 * @route /update/details/:staffId?role=role
 **/

router.post("/update/details/:staffId", authenticateUser, updateStaffDetails);

/**
 * @description update staff password
 * @method POST
 * @route /update/password/:staffId?role=role
 **/

router.post(
  "/update/password/:staffId",
  authenticateUser,
  updateStaffPasswords
);

/**
 * @description delete staff account
 * @method GET
 * @route /update/password/:staffId?role=role
 **/

router.get("/delete/account/:staffId", authenticateUser, deletestaffAccount);

/**
 * @description view all staff by role
 * @method GET
 * @route /view/staff?role=role
 **/

router.get("/view/staffs", authenticateUser, viewStaff);

/**
 * @description view staff profile
 * @method GET
 * @route /view/staff/:staffId?role=role
 **/

router.get("/view/staff/:staffId", staffProfile);

module.exports = router;
