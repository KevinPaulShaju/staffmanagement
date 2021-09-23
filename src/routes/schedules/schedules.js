const express = require("express");
const router = express.Router();

const {
    viewAllSchedules,
    viewASchedule,
    createASchedule,
    viewAllSchedulesOfaUser,
    toRemoveaSchedule,
    toRemoveAllSchedulesofAUser,
    getSchedulesByUserIdandScheduleId,
    updateForHigherOffcials,
    updateForUsers
} = require("../../controllers/schedules/schedules");


// To View all The Routes
router.get('/view/all',viewAllSchedules); 

//to view a Schedule
router.get("/view/:scheduleId",viewASchedule);

//to view schedules of a user
router.get("/user/view/:userId",viewAllSchedulesOfaUser)

//to view a schedule by userId & scheduleId
router.get("/user/schedule/",getSchedulesByUserIdandScheduleId);

//to create a new Schedule
router.post("/add/:userId",createASchedule);

//update schedule for higher officials
router.post("/update/officials/:scheduleId",updateForHigherOffcials);

//update schedule for users
router.post("/update/:scheduleId",updateForUsers)

// to delete schedules of a user
router.get("/remove/all/:userId",toRemoveAllSchedulesofAUser);

//to remove a Schedule
router.get("/remove/:scheduleId",toRemoveaSchedule);


module.exports = router;