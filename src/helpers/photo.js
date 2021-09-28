const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: process.env.SECERET_ACCESS_KEY,
    accessKeyId: process.env.KEY_ID,
    region: 'ap-south-1'
});


var s3 = new aws.S3();

const storageKbDocuments = multer.diskStorage({
    destination: "./uploads/kbdocuments/",

    filename: function (req, file, cb) {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});


const uploadStaff = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'photostaffs',
        acl:'public-read',
        metadata: function(req, res,cb){
            return cb(null,{fieldname:'User Photo'});
        },
        key: function (req, file, cb) {
            console.log(file);
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
        
    }),
    limits:{
        fileSize: 5000000,
    },
    fileFilter(req, file, cb,next) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please Upload a Photo"));
        }
        cb(undefined, true);
        
    },
});


const uploadUser = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'photousers',
        acl:'public-read',
        metadata: function(req, res,cb){
            return cb(null,{fieldname:'User Photo'});
        },
        key: function (req, file, cb) {
            console.log(file);
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
        }
        
    }),
    limits:{
        fileSize: 5000000,
    },
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


module.exports = {uploadStaff,uploadUser,kbDocuments,s3};