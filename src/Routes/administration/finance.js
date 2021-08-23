const express = require("express");
const router = express.Router();
const { ensureFinance } = require("../../middlewares/commonAuth");


const {financeLogin} = require("../../Controllers/administration/subOrdinateslogin");

const {financeDetails} = require("../../Controllers/administration/subOrdinatesdetails");


const {
  viewSupports,
} = require("../../Controllers/administration/viewSubordinates");



/**
 * @description  finance login
 * @method POST /login
 * **/
router.post("/login", financeLogin);

/**
 * @description  view finance profile
 * @method GET /view
 * **/
router.get("/view", ensureFinance, financeDetails);


/**
 * @description  to view all the supports
 * @method GET /view/supports
 * **/
router.get("/view/supports", ensureFinance, viewSupports);

module.exports = router;
