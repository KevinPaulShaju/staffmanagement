const express = require("express");
const router = express.Router();
const { ensureManager } = require("../../middlewares/auth");

const {
  createManager,
  managerLogin,
  updateManagerDetails,
  updateManagerPasswords,
  deleteManagerAccount,
  managerDetails,
} = require("../../Controllers/administration/manager");

/**
 * @description create a new manager
 * @method POST /register
 * **/
router.post("/register", createManager);

/**
 * @description  manager login
 * @method POST /login
 * **/
router.post("/login", managerLogin);

/**
 * @description  view manager profile
 * @method GET /view
 * **/
router.get("/view", ensureManager, managerDetails);

/**
 * @description  update manager details
 * @method POST /update/details/:managerId
 * **/
router.post("/update/details/:managerId", ensureManager, updateManagerDetails);

/**
 * @description  update manager passwords
 * @method POST /update/passwords/:managerId
 * **/
router.post(
  "/update/passwords/:managerId",
  ensureManager,
  updateManagerPasswords
);

/**
 * @description  delete manager account
 * @method GET /account/delete/:managerId
 * **/
router.get("/account/delete/:managerId", ensureManager, deleteManagerAccount);

/**
 * @description  to view all the finance
 * @method GET /view/finance
 * **/
router.get("/view/finance", ensureManager, viewFinance);

/**
 * @description  to view all the supports
 * @method GET /view/supports
 * **/
router.get("/view/supports", ensureManager, viewSupports);

module.exports = router;
