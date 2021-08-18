const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../../middlewares/auth");
const {
  adminLogin,
  registerAdmin,
} = require("../../Controllers/administration/admin");

/**
 * @description create a new admin
 * @method POST /register
 * **/

router.post("/register", registerAdmin);

/**
 * @description  admin login
 * @method POST /login
 * **/

router.post("/login", adminLogin);

/**
 * @description  update admin details
 * @method PATCH /update
 * **/

router.patch("/update", (req, res) => {});

module.exports = router;
