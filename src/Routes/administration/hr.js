const express = require("express");
const router = express.Router();
const { ensureHr } = require("../../middlewares/commonAuth");

const {
  hrDetails,
} = require("../../Controllers/administration/subOrdinatesdetails");

const {
  hrLogin,
} = require("../../Controllers/administration/subOrdinateslogin");

const {
  viewFinance,
  viewManagers,
  viewSupports,
} = require("../../Controllers/administration/viewSubordinates");

/**
 * @description  hr login
 * @method POST /login
 * **/
router.post("/login", hrLogin);

/**
 * @description  view hr profile
 * @method GET /view
 * **/
router.get("/view", ensureHr, hrDetails);

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
