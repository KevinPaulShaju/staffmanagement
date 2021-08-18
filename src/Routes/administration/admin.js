const router = require("express").Router();
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
