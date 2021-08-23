const express = require("express");
const router = express.Router();

const {
    registerUsers,
    userLogin,
    updateUserDetails,
    updateUserPasswords,
    deleteUserAccount
} = require("../../Controllers/user/EndUser");


router.post('/register',registerUsers);

router.post('/login',userLogin);

router.post('/update/details/:userId',updateUserDetails);

router.post('/update/password/:userId',updateUserPasswords);

router.get('/delete/:userId',deleteUserAccount);


module.exports = router;