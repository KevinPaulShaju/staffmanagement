const express = require("express");
const router = express.Router();
const { ensureSupport } = require("../../middlewares/auth");

const {supportLogin} = require("../../Controllers/administration/subOrdinateslogin");

const {supportDetails} = require("../../Controllers/administration/subOrdinatesdetails");


/**
 * @description  support login
 * @method POST /login
 * **/
router.post("/login", supportLogin);


/**
 * @description  view support profile
 * @method GET /view
 * **/
router.get("/view", ensureSupport, supportDetails);


module.exports = router;
