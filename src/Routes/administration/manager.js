const express = require("express");
const router = express.Router();
const { ensureManager } = require("../../middlewares/auth");

const {
  createManager,
  managerLogin,
  updateManagerDetails,
  updateManagerPasswords,
  deleteManagerAccount,
  managerDetails
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


// To View profile
router.get("/view", ensureManager, managerDetails);


/**
 * @description  update manager details
 * @method POST /update
 * **/

router.post("/update/details/:managerId", ensureManager, updateManagerDetails);

/**
 * @description  update manager passwords
 * @method POST /update
 * **/

router.post("/update/passwords/:managerId",ensureManager,updateManagerPasswords);

/**
 * @description  delete manager account
 * @method GET /update
 * **/

router.get("/account/delete/:managerId", ensureManager, deleteManagerAccount);

module.exports = router;
