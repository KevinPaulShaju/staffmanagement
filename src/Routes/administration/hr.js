const express = require("express");
const router = express.Router();
const { ensureHr } = require("../../middlewares/auth");
const {
  createHr,
  hrLogin,
  updateHrDetails,
  updateHrPasswords,
  deleteHrAccount,
} = require("../../Controllers/administration/hr");

/**
 * @description create a new hr
 * @method POST /register
 * **/

router.post("/register", createHr);

/**
 * @description  hr login
 * @method POST /login
 * **/

router.post("/login", hrLogin);

/**
 * @description  update hr details
 * @method POST /update
 * **/

router.post("/update/details/:hrId", ensureHr, updateHrDetails);

/**
 * @description  update hr passwords
 * @method POST /update
 * **/

router.post("/update/passwords/:hrId", ensureHr, updateHrPasswords);

/**
 * @description  delete hr account
 * @method GET /update
 * **/

router.get("/account/delete/:hrId", ensureHr, deleteHrAccount);

module.exports = router;
