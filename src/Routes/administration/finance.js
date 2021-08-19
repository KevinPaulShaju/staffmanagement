const express = require("express");
const router = express.Router();
const { ensureFinance } = require("../../middlewares/auth");

const {
  createFinance,
  financeLogin,
  updateFinanceDetails,
  updateFinancePasswords,
  deleteFinanceAccount,
  financeDetails,
} = require("../../Controllers/administration/finance");

/**
 * @description create a new finance
 * @method POST /register
 * **/
router.post("/register", createFinance);

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
 * @description  update finance details
 * @method POST /update/details/:financeId
 * **/
router.post("/update/details/:financeId", ensureFinance, updateFinanceDetails);

/**
 * @description  update finance passwords
 * @method POST /update/passwords/:financeId
 * **/
router.post(
  "/update/passwords/:financeId",
  ensureFinance,
  updateFinancePasswords
);

/**
 * @description  delete finance account
 * @method GET /account/delete/:financeId
 * **/
router.get("/account/delete/:financeId", ensureFinance, deleteFinanceAccount);

/**
 * @description  to view all the supports
 * @method GET /view/supports
 * **/
router.get("/view/supports", ensureFinance, viewSupports);

module.exports = router;
