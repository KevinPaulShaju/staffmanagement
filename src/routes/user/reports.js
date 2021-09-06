const express = require("express");
const router = express.Router();

const {
  createUserReport,
  updateReport,
  viewReport,
  viewAllReports,
  viewReportsByCarer,
  viewReportsByUser,
  deleteReport,
} = require("../../controllers/user/UserReport");

/**
 * @description add a report
 * @method POST
 * @route /add?staffId=id&carerId=id
 **/

router.post("/add", createUserReport);

/**
 * @description update a report
 * @method POST
 * @route /update/:reportId
 **/

router.post("/update/:reportId", updateReport);

/**
 * @description view a report
 * @method GET
 * @route /view/:reportId
 **/

router.get("/view/:reportId", viewReport);

/**
 * @description view all reports
 * @method GET
 * @route /all
 **/

router.get("/all", viewAllReports);

/**
 * @description view all reports by carer
 * @method GET
 * @route /view/carer/:carerId
 **/

router.get("/view/carer/:carerId", viewReportsByCarer);

/**
 * @description view all reports by carer
 * @method GET
 * @route /view/user/:userId
 **/

router.get("/view/user/:userId", viewReportsByUser);

/**
 * @description delete a report
 * @method GET
 * @route /remove/reportId
 **/

router.get("/remove/:reportId", deleteReport);

module.exports = router;
