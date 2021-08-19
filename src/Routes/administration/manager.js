const express = require("express");
const router = express.Router();
const { ensureManager } = require("../../middlewares/auth");

const {
  createManager,
  managerLogin,
  updateManagerDetails,
  updateManagerPasswords,
  deleteManagerAccount
} = require("../../Controllers/administration/manager");

/**
 * @description create a new hr
 * @method POST /register
 * **/

router.post("/register", createManager);

/**
 * @description  hr login
 * @method POST /login
 * **/

router.post("/login", managerLogin);

/**
 * @description  update hr details
 * @method POST /update
 * **/

router.post("/update/details/:managerId", ensureManager, updateManagerDetails);

/**
 * @description  update hr passwords
 * @method POST /update
 * **/

router.post("/update/passwords/:managerId", ensureManager, updateManagerPasswords);

/**
 * @description  delete hr account
 * @method GET /update
 * **/

router.get("/account/delete/:managerId", ensureManager , deleteManagerAccount);


module.exports = router;
