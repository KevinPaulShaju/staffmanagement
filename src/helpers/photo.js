const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config({ path: "../config/config.env" });

aws.config.update({
  secretAccessKey: process.env.SECERET_ACCESS_KEY,
  accessKeyId: process.env.KEY_ID,
  region: "ap-south-1",
});

var s3 = new aws.S3();

const uploadStaff = multer({
  storage: multerS3({
    s3: s3,
    bucket: "photostaffs",
    acl: "public-read",
    metadata: function (req, res, cb) {
      return cb(null, { fieldname: "User Photo" });
    },
    key: function (req, file, cb) {
      console.log(file);
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb, next) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please Upload a Photo"));
    }
    cb(undefined, true);
  },
});

const uploadUser = multer({
  storage: multerS3({
    s3: s3,
    bucket: "photousers",
    acl: "public-read",
    metadata: function (req, res, cb) {
      return cb(null, { fieldname: "User Photo" });
    },
    key: function (req, file, cb) {
      console.log(file);
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb, next) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please Upload a Photo"));
    }
    cb(undefined, true);
  },
});

const kbDocuments = multer({
  storage: multerS3({
    s3: s3,
    bucket: "kbsubdocuments",
    acl: "public-read",
    metadata: function (req, res, cb) {
      return cb(null, { fieldname: "User Photo" });
    },
    key: function (req, file, cb) {
      console.log(file);
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 1000000 * 10,
  },
});

const staffDocuments = multer({
  storage: multerS3({
    s3: s3,
    bucket: "staff-document",
    acl: "public-read",
    metadata: function (req, res, cb) {
      return cb(null, { fieldname: "User Photo" });
    },
    key: function (req, file, cb) {
      console.log(file);
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 1000000 * 10,
  },
});

module.exports = { uploadStaff, uploadUser, kbDocuments, staffDocuments, s3 };
