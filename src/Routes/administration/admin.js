const express = require("express");
const router = express.Router();
const { ensureAdmin } = require("../../middlewares/commonAuth");
const {
  manageFinance,
  manageSupport,
} = require("../../middlewares/manageStaffAuth");

const {
  createHr,
  createManager,
  createFinance,
  createSupport,
} = require("../../Controllers/administration/createSubordinates");

const {
  updateHrDetails,
  updateManagerDetails,
  updateFinanceDetails,
  updateSupportDetails,
} = require("../../Controllers/administration/updateSubordinatesDetails");

const {
  updateHrPasswords,
  updateManagerPasswords,
  updateFinancePasswords,
  updateSupportPasswords,
} = require("../../Controllers/administration/updateSubordinatepassword");

const {
  deleteHrAccount,
  deleteManagerAccount,
  deleteFinanceAccount,
  deleteSupportAccount,
} = require("../../Controllers/administration/deleteSubordinatesaccount");

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

// To Create Sub-ordinates
router.post("/register/hr", createHr);

router.post("/register/manager", createManager);

router.post("/register/finance", manageFinance, createFinance);

router.post("/register/support", manageSupport, createSupport);

// To Update sub-Ordinate Details

/**
 * @description  update hr details
 * @method POST /update/details/:hrId
 * **/
router.post("/update/details/hr/:hrId", ensureAdmin, updateHrDetails);

/**
 * @description  update finance details
 * @method POST /update/details/:financeId
 * **/
router.post(
  "/update/details/finance/:financeId",
  ensureAdmin,
  updateFinanceDetails
);

/**
 * @description  update manager details
 * @method POST /update/details/:managerId
 * **/
router.post(
  "/update/details/manager/:managerId",
  ensureAdmin,
  updateManagerDetails
);

/**
 * @description  update suport details
 * @method POST /update/details/:supportId
 * **/
router.post(
  "/update/details/support/:supportId",
  ensureAdmin,
  updateSupportDetails
);

// Update Sub-ordinate passwords

/**
 * @description  update hr passwords
 * @method POST /update/passwords/:hrId
 * **/
router.post("/update/passwords/hr/:hrId", ensureAdmin, updateHrPasswords);

/**
 * @description  update manager passwords
 * @method POST /update
 * **/

router.post(
  "/update/passwords/manager/:managerId",
  ensureAdmin,
  updateManagerPasswords
);

/**
 * @description  update finance passwords
 * @method POST /update/passwords/:financeId
 * **/
router.post(
  "/update/passwords/finance/:financeId",
  ensureAdmin,
  updateFinancePasswords
);

/**
 * @description  update support passwords
 * @method POST /update
 * **/

router.post(
  "/update/passwords/support/:supportId",
  ensureAdmin,
  updateSupportPasswords
);

// Delete Sub-ordinates account

/**
 * @description  delete hr account
 * @method GET /account/delete/:hrId
 * **/
router.get("/account/delete/hr/:hrId", ensureAdmin, deleteHrAccount);

/**
 * @description  delete manager account
 * @method GET /account/delete/:managerId
 * **/
router.get(
  "/account/delete/manager/:managerId",
  ensureAdmin,
  deleteManagerAccount
);

/**
 * @description  delete finance account
 * @method GET /account/delete/:financeId
 * **/
router.get(
  "/account/delete/finance/:financeId",
  ensureAdmin,
  deleteFinanceAccount
);

/**
 * @description  delete support account
 * @method GET /account/delete/:supportId
 * **/
router.get(
  "/account/delete/support/:supportId",
  ensureAdmin,
  deleteSupportAccount
);

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
