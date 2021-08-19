const express = require("express");
const router = express.Router();
const { ensureHr } = require("../../middlewares/auth");

const {
  createHr,
  hrLogin,
  updateHrDetails,
  updateHrPasswords,
  deleteHrAccount,
  hrDetails,
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
 * @method POST /update/details/:hrId
 * **/
router.post("/update/details/:hrId", ensureHr, updateHrDetails);

/**
 * @description  view hr profile
 * @method GET /view
 * **/
router.get("/view", ensureHr, hrDetails);

/**
 * @description  update hr passwords
 * @method POST /update/passwords/:hrId
 * **/
router.post("/update/passwords/:hrId", ensureHr, updateHrPasswords);

/**
 * @description  delete hr account
 * @method GET /account/delete/:hrId
 * **/
router.get("/account/delete/:hrId", ensureHr, deleteHrAccount);

/**
 * @description  to view all the finance
 * @method GET /view/finance
 * **/
router.get("/view/finance", ensureHr, viewFinance);

/**
 * @description  to view all the supports
 * @method GET /view/supports
 * **/
router.get("/view/supports", ensureHr, viewSupports);

module.exports = router;
