const express = require("express");
const fs = require("fs");
const upload = require("../../helpers/photo");
const Carer = require("../../models/administration/carer");
const router = express.Router();

const {
    registerCarer,
    carerLogin,
    updateCarerDetails,
    updateCarerPasswords,
    carerDetails,
    deleteCarerAccount
} = require("../../controllers/administration/carer");


/**
 * @description create admin accounts
 * @method POST
 * @route /admin/register
 **/

router.post("/register", registerCarer);


/**
 * @description admin login
 * @method POST
 * @route /admin/login
 **/

router.post("/login", carerLogin);

/**
 * @description update admin details
 * @method POST
 * @route /update/details/:carerId
 **/

router.post("/update/details/:carerId", updateCarerDetails);

/**
 * @description update admin password
 * @method POST
 * @route /update/password/:carerId
 **/

router.post("/update/password/:carerId", updateCarerPasswords);

/**
 * @description view admin profile
 * @method GET
 * @route /view/profile/:carerId
 **/

router.get("/view/profile/:carerId", carerDetails);


/**
 * @description delete admin account
 * @method GET
 * @route /update/password/:carerId
 **/

router.get("/delete/account/:carerId", deleteCarerAccount);



router.post("/profile/photo/:carerId", upload.single("photo"), async (req, res) => {
    console.log(req.file)

    const carerId = req.params.carerId

    const findCarer = await Carer.findOne({ _id: carerId });

    if (!findCarer) {
        return res.status(404).json({ error: "Carer Not Found" });
    }

    if (findCarer.photo !== null) {
        const profilePic = findCarer.photo;
        var fields = profilePic.split("/");
        const profilePhoto = fields[fields.length - 1];

        fs.unlink(`./uploads/images/${profilePhoto}`, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            findCarer.photo = `http://localhost:5000/photo/${req.file.filename}`;
            findCarer.save();
        });

        return res.status(200).json({ success: 1, message: findCarer.photo });
    }

    findCarer.photo = `http://localhost:5000/profile/${req.file.filename}`
    findCarer.save();

    res.status(200).json({
        message: "photo upload successful",
        profileUrl: `http://localhost:5000/profile/${req.file.filename}`
    })
    console.log(`http://localhost:5000/profile/${req.file.filename}`);

});


module.exports = router; 0
