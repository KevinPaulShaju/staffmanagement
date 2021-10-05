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
  getBrokerageUsers,
  getNdicUsers,
  getTacUsers,
  getUsersWithCoordinator,
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
router.get("/delete/:userId", deleteuser);

// view users profile
router.get("/view/profile/:userId", viewUserProfile);

/**
 * @desc view all users
 * @method GET
 * @route  /view/all
 */
router.get("/view/all", viewAllUsers);

// filter routes

/**
 * @desc view ndic users
 * @method GET
 * @route  /view/ndic
 */
router.get("/view/ndic", getNdicUsers);

/**
 * @desc view tac users
 * @method GET
 * @route  /view/tac
 */
router.get("/view/tac", getTacUsers);

/**
 * @desc view brokerage users
 * @method GET
 * @route  /view/brokerage
 */
router.get("/view/brokerage", getBrokerageUsers);

/**
 * @desc view userswithcoordinator users
 * @method GET
 * @route  /view/userswithcoordinator
 */
router.get("/view/userswithcoordinator", getUsersWithCoordinator);

module.exports = router;
