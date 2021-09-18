const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const storageStaff = multer.diskStorage({
    destination: "./uploads/images/staff/",

    filename: function (req, file, cb) {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const storageUser = multer.diskStorage({
    destination: "./uploads/images/user/",

    filename: function (req, file, cb) {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

const storageKbDocuments = multer.diskStorage({
    destination: "./uploads/kbdocuments/",

    filename: function (req, file, cb) {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const uploadStaff = multer({
    storage: storageStaff,
    limits: {
        fileSize: 5000000,
    },
    abortOnLimit: true,
    fileFilter(req, file, cb,next) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please Upload a Photo"));
        }
        cb(undefined, true);
        
    },
});


const uploadUser = multer({
    storage: storageUser,
    limits: {
        fileSize: 5000000,
    },
    abortOnLimit: true,
    fileFilter(req, file, cb,next) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please Upload a Photo"));
        }
        cb(undefined, true);
        
    },
});


const kbDocuments = multer({
    storage: storageKbDocuments,
    limits: {
        fileSize: 5000000*2,
    },
    abortOnLimit: true,
    fileFilter(req, file, cb,next) {
        if (!file.originalname.match(/\.(pdf|txt)$/)) {
            return cb(new Error("Please Upload a Photo"));
        }
        cb(undefined, true);
        
    },
});


module.exports = {uploadStaff,uploadUser,kbDocuments};