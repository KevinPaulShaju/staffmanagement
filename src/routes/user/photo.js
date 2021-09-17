const express = require("express");
const router = express.Router();
const fs = require("fs");
const User = require("../../models/user/user");
const { uploadUser } = require("../../helpers/photo");

router.post("/add/:userId",uploadUser.single("photo"),async (req, res) => {
    console.log(req.file);

    const _id = req.params.userId;
    if(!_id) {
      return res.status(400).json({error:"Id Required"});
    }
    if(!req.file){
      return res.status(400).json({error:"Please Upload a Photo"})
    }
    const findUser = await User.findOne({ _id });

    if (!findUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    if (findUser.photo !== null) {
      const profilePic = findUser.photo;
      var fields = profilePic.split("/");
      const profilePhoto = fields[fields.length - 1];

      fs.unlink(`./uploads/images/user/${profilePhoto}`, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        findUser.photo = `http://localhost:5000/profile/user/${req.file.filename}`;
        findUser.save();
      });

      return res.status(200).json({ success: 1, message: findUser.photo });
    }

    findUser.photo = `http://localhost:5000/profile/user/${req.file.filename}`;
    findUser.save();

    res.status(200).json({
      message: "photo upload successful",
      profileUrl: `http://localhost:5000/profile/user/${req.file.filename}`,
    });
    console.log(`http://localhost:5000/profile/user/${req.file.filename}`);
  },
  (err, req, res, next) => {
    return res.status(400).send({ success: 0, error: err.message });
  }
);

//to get User profile photo
router.get("/show/:userId", async (req, res) => {
  try {
    //
    const _id = req.params.userId;
    if(!_id) {
      return res.status(400).json({error:"Id Required"});
    }

    const findUser = await User.findOne({ _id });

    if (!findUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.status(200).json({ message: findUser.photo });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

//to remove profile picture
router.get("/remove/:userId", async (req, res) => {
  try {
    //
    const _id = req.params.userId;
    if(!_id) {
      return res.status(400).json({error:"Id Required"});
    }
    const findUser = await User.findOne({ _id });

    if (!findUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    if (findUser.photo === null) {
      return res.status(204).json({ message: "User Does not have a photo" });
    }
    const profilePic = findUser.photo;
    var fields = profilePic.split("/");
    const profilePhoto = fields[fields.length - 1];

    fs.unlink(`./uploads/images/user/${profilePhoto}`, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      findUser.photo = null;
      await findUser.save();
    });

    res.status(200).json({ success: 1, message: "Profile Photo Removed" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

module.exports = router;
