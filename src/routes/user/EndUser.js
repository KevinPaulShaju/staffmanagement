const express = require("express");
const router = express.Router();

const {
  registerUsers,
  userLogin,
  viewUserProfile,
  viewAllUsers,
  updateUser,
  changePassword,
  deleteuser,
} = require("../../controllers/user/EndUser");

// to register a new user
router.post("/register", registerUsers);

// to login a user
router.post("/login", userLogin);

/**
 * @desc update user
 * @method POST
 * @route  /update/:userId
 */
router.post("/update/:userId", updateUser);

/**
 * @desc update user password
 * @method POST
 * @route  /update/password/:userId
 */
router.post("/update/password/:userId", changePassword);

/**
 * @desc delete user account
 * @method POST
 * @route  /delete/:userId
 */
router.post("/delete/:userId", deleteuser);

// view users profile
router.get("/view/profile/:userId", viewUserProfile);

/**
 * @desc view all users
 * @method GET
 * @route  /view/all
 */
router.get("/view/all", viewAllUsers);

module.exports = router;
