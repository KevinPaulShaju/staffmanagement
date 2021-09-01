const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/images/",

    filename: function (req, file, cb) {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
    abortOnLimit: true,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please Upload a Photo"));
        }
        cb(undefined, true);
    },
});

module.exports = upload;