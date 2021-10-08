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
  viewAllStaffs,
  getSupportCoordinator,
} = require("../../controllers/administration/manageStaff");
const upload = require("../../helpers/photo");

const { changeRoles } = require("../../controllers/administration/Permissions");
const { getAllRoles } = require("../../controllers/administration/roles");

const {
  authenticateUser,
  authenticateAdmin,
} = require("../../middlewares/auth");

/**
 * @description create staff accounts
 * @method POST
 * @route /staff/register?role=role
 **/

router.post("/register", createStaff);

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

router.post("/update/details/:staffId", updateStaffDetails);

/**
 * @description update staff password
 * @method POST
 * @route /update/password/:staffId?role=role
 **/

router.post("/update/password/:staffId", updateStaffPasswords);

/**
 * @description delete staff account
 * @method GET
 * @route /update/password/:staffId?role=role
 **/

router.get("/delete/account/:staffId", deletestaffAccount);

/**
 * @description view all staff by role
 * @method GET
 * @route /view/staff?role=role
 **/

router.get("/view/staffs", viewStaff);

/**
 * @description view all
 * @method GET
 * @route /view/all
 **/

router.get("/view/staffs/all", viewAllStaffs);

/**
 * @description view staff profile
 * @method GET
 * @route /view/staff/:staffId?role=role
 **/

router.get("/view/staff/:staffId", staffProfile);

/**
 * @description edit staff permissions
 * @method POST
 * @route /staff/roles/:staffId?role=role
 **/

router.post("/permissions/:staffId", changeRoles);

/**
 * @description get support coordinator staffs
 * @method GET
 * @route /staff/support/all
 **/
router.get("/staff/support/all", getSupportCoordinator);

module.exports = router;
