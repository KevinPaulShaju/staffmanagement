const express = require("express");
const router = express.Router();
const fs = require("fs");
const Staff = require("../../models/administration/staff");
const { uploadStaff } = require("../../helpers/photo");

router.post("/add/:staffId",uploadStaff.single("photo"),async (req, res) => {
    console.log(req.file);

    const _id = req.params.staffId;

    if(!_id) {
      return res.status(400).json({error:"Id Required"});
    }

    if(!req.file){
      return res.status(400).json({error:"Please Upload a Photo"})
    }

    const findStaff = await Staff.findOne({ _id });

    if (!findStaff) {
      return res.status(404).json({ error: "Staff Not Found ." });
    }

    if (findStaff.photo !== null) {
      const profilePic = findStaff.photo;
      var fields = profilePic.split("/");
      const profilePhoto = fields[fields.length - 1];

      fs.unlink(`./uploads/images/staff/${profilePhoto}`, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        findStaff.photo = `https://careflo.herokuapp.com/profile/staff/${req.file.filename}`;
        findStaff.save();
      });

      return res.status(200).json({ success: 1, message: findStaff.photo });
    }

    findStaff.photo = `https://careflo.herokuapp.com/profile/staff/${req.file.filename}`;
    findStaff.save();

    res.status(200).json({
      message: "photo upload successful",
      profileUrl: `https://careflo.herokuapp.com/profile/staff/${req.file.filename}`,
    });
    console.log(`https://careflo.herokuapp.com/profile/staff/${req.file.filename}`);
  },
  (err, req, res, next) => {
    return res.status(400).send({ success: 0, error: err.message });
  }
);

//to get Staff profile photo
router.get("/show/:staffId", async (req, res) => {
  try {
    //
    const _id = req.params.staffId;
    if(!_id) {
      return res.status(400).json({error:"Id Required"});
    }

    const findStaff = await Staff.findOne({ _id });

    if (!findStaff) {
      return res.status(404).json({ error: "Staff Not Found" });
    }

    res.status(200).json({ message: findStaff.photo });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

//to remove profile picture
router.get("/remove/:staffId", async (req, res) => {
  try {
    //
    const _id = req.params.staffId;
    if(!_id) {
      return res.status(400).json({error:"Id Required"});
    }
    
    const findStaff = await Staff.findOne({ _id });

    if (!findStaff) {
      return res.status(404).json({ error: "Staff Not Found" });
    }

    if (findStaff.photo === null) {
      return res.status(204).json({ message: "Staff Does not have a photo" });
    }
    const profilePic = findStaff.photo;
    var fields = profilePic.split("/");
    const profilePhoto = fields[fields.length - 1];

    fs.unlink(`./uploads/images/staff/${profilePhoto}`, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      findStaff.photo = null;
      await findStaff.save();
    });

    res.status(200).json({ success: 1, message: "Profile Photo Removed" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: e.message });
  }
});

module.exports = router;
