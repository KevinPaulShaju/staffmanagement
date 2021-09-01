const express = require("express");
const router = express.Router();

const {
    registerUsers,
    userLogin,
    viewUserProfile
} = require("../../controllers/user/EndUser");

// to register a new user
router.post("/register", registerUsers);

// to login a user
router.post("/login",userLogin);

// view users profile 
router.get("/view/profile/:userId",viewUserProfile);

module.exports = router;