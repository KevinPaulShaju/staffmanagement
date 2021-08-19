const express = require("express");
const router = express.Router();
const { ensureFinance } = require("../../middlewares/auth");

const {
  createFinance,
  financeLogin,
  updateFinanceDetails,
  updateFinancePasswords,
  deleteFinanceAccount,
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
 * @description  update finance details
 * @method POST /update
 * **/

router.post("/update/details/:financeId", ensureFinance, updateFinanceDetails);

/**
 * @description  update finance passwords
 * @method POST /update
 * **/

router.post(
  "/update/passwords/:financeId",
  ensureFinance,
  updateFinancePasswords
);

/**
 * @description  delete finance account
 * @method GET /update
 * **/

router.get("/account/delete/:financeId", ensureFinance, deleteFinanceAccount);

module.exports = router;
