const express = require("express");
const router = express.Router();
const { ensureManager } = require("../../middlewares/commonAuth");

const {managerLogin} = require("../../Controllers/administration/subOrdinateslogin");

const {managerDetails} = require("../../Controllers/administration/subOrdinatesdetails");



const {
  viewFinance,
  viewManagers,
  viewSupports,
} = require("../../Controllers/administration/viewSubordinates");




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
