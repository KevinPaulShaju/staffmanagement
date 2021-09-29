const Schedules = require("../../models/schedules/schedules");
const Staff = require("../../models/administration/staff");

exports.assignSchedule = async (req, res) => {
  router.post("/assignschedule/:carerId", async (req, res) => {
    const carerId = req.query.carerId;
    const scheduleId = req.query.scheduleId;
    var { from, to, userLocation } = req.body;

    const servicefrom = new Date(from);
    const fromdateinmillis = servicefrom.getTime();
    const serviceto = new Date(to);
    const todateinmillis = serviceto.getTime();

    const time = new Date();
    const offset = time.getTimezoneOffset();
    const offsetinmillis = offset * 60 * 1000;
    const dateinmillis = time.getTime();
    const localinmillis = dateinmillis - offsetinmillis;
    // const localdate = new Date(localinmillis).toISOString();

    const servicestarts = fromdateinmillis - localinmillis;
    const serviceends = todateinmillis - localinmillis;

    console.log(
      "servicefrom: " + fromdateinmillis,
      "serviceto: " + todateinmillis
    );

    try {
      var carerExists = await Staff.findOne({ _id: carerId });
      if (!carerExists) {
        return res.status(402).json({ message: "user not found" });
      }

      setTimeout(async () => {
        const newstatus = {
          schedule: {
            to: new Date(todateinmillis).toISOString(),
            from: new Date(fromdateinmillis).toISOString(),
            location: userLocation,
          },
          working: true,
        };

        await Staff.findOneAndUpdate(
          { _id: carerId },
          { $set: { active: newstatus } }
        );
      }, servicestarts);
      const updatedSchedule = Schedules.findOneAndUpdate(
        { _id: scheduleId },
        { $set: { carerId: carerId, assigned: true } },
        { new: true }
      );

      setTimeout(async () => {
        const newstatus = {
          schedule: {
            to: undefined,
            from: undefined,
            location: {},
          },
          working: false,
        };

        const updatedSchedule = Schedules.findOneAndUpdate(
          { _id: scheduleId },
          { $set: { past: true } },
          { new: true }
        );

        await Staff.findOneAndUpdate(
          { _id: carerId },
          { $set: { active: newstatus } }
        );
      }, serviceends);

      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.getAvailableUsers = async (req, res) => {
  const { from, to, job } = req.body;
  var { userLocation } = req.body;
  if (!from || !to || !job || !userLocation) {
    return res.status(404).json({ message: "fillup all fields" });
  }

  const servicefrom = new Date(from);
  //   const fromoffset = servicefrom.getTimezoneOffset();
  //   const fromoffsetinmillis = fromoffset * 60 * 1000;
  const fromdateinmillis = servicefrom.getTime();
  //   const fromlocalinmillis = fromdateinmillis - fromoffsetinmillis;
  const fromdateformat = new Date(fromdateinmillis);

  const serviceto = new Date(to);
  //   const tooffset = serviceto.getTimezoneOffset();
  //   const tooffsetinmillis = tooffset * 60 * 1000;
  const todateinmillis = serviceto.getTime();
  //   const tolocalinmillis = todateinmillis - tooffsetinmillis;
  const todateformat = new Date(todateinmillis);
  console.log("date formats", fromdateformat, todateformat);

  try {
    const carers = await Staff.find();
    if (!carers || carers.length === 0) {
      return res.status(404).json({ error: "No carers found" });
    }

    const schedules = await Schedules.find({ past: false, assigned: true });

    var availableSchedules = schedules.filter((schedule) => {
      const to = new Date(schedule.to);
      const from = new Date(schedule.from);

      if (
        (Date.parse(from) < Date.parse(fromdateformat) &&
          Date.parse(to) < Date.parse(fromdateformat)) ||
        (Date.parse(from) > Date.parse(todateformat) &&
          Date.parse(to) > Date.parse(todateformat))
      ) {
        return schedule;
      } else {
        return false;
      }
    });

    var unavailableSchedules = schedules.filter((schedule) => {
      const from = new Date(schedule.from);
      const to = new Date(schedule.to);

      if (
        (Date.parse(from) > Date.parse(fromdateformat) &&
          Date.parse(from) < Date.parse(todateformat)) ||
        (Date.parse(to) > Date.parse(fromdateformat) &&
          Date.parse(to) < Date.parse(todateformat)) ||
        (Date.parse(from) <= Date.parse(fromdateformat) &&
          Date.parse(to) >= Date.parse(todateformat))
      ) {
        return schedule;
      }
    });

    var availableIds = availableSchedules.map((availschedule) => {
      return availschedule.userId.toString();
    });

    var unavailableIds = unavailableSchedules.map((unavailschedule) => {
      return unavailschedule.userId.toString();
    });

    var filteredIds = availableIds.filter(function (el) {
      if (!this[el]) {
        this[el] = true;
        return true;
      }
      return false;
    }, Object.create(null));

    var availableworkersIds = filteredIds.filter(function (val) {
      return unavailableIds.indexOf(val) == -1;
    });

    const userObjIds = availableworkersIds.map((id) => {
      return mongoose.Types.ObjectId(id);
    });

    const userNames = await Promise.all(
      userObjIds.map(async (id) => {
        const foundUser = await Staff.findOne({ _id: id });
        return foundUser;
      })
    );

    const userByJob = userNames.filter((user) => {
      return user.job == req.body.job;
    });

    const availableUsersWithSchedules = await Promise.all(
      userByJob.map(async (user) => {
        const findSchedules = await Schedules.find({ userId: user.id });
        if (findSchedules.length === 0) {
          return "No Schedule For This User";
        }
        return { userDetails: user, schedule: findSchedules };
      })
    );

    var beforeAfterSchedules = await Promise.all(
      availableUsersWithSchedules.map(async (schedule) => {
        var scheduleBefore = [],
          scheduleAfter = [];

        const differenceTime = schedule.schedule.map((sc) => {
          const from = sc.from.getTime();
          const to = sc.to.getTime();

          if (to < fromdateformat.getTime()) {
            const diff = fromdateformat.getTime() - to;
            scheduleBefore.push({
              userId: sc.userId,
              scheduleId: sc.id,
              timeDiff: diff,
            });
          }

          if (from > todateformat.getTime()) {
            const diff = from - todateformat.getTime();
            scheduleAfter.push({
              userId: sc.userId,
              scheduleId: sc.id,
              timeDiff: diff,
            });
          }

          const timeDiff = { scheduleId: sc.id, userId: sc.userId };
          return timeDiff;
        });

        delete schedule.schedule;
        let minBef, minAft, before, after, fullBefore, fullAfter;

        if (scheduleBefore.length > 0) {
          minBef = scheduleBefore.reduce(function (prev, curr) {
            return prev.timeDiff < curr.timeDiff ? prev : curr;
          });
          before = await Schedules.findOne({
            _id: minBef.scheduleId,
            userId: minBef.userId,
          });

          const userlat = userLocation.latitude;
          const userlng = userLocation.longitude;
          const lat = before.location.latitude;
          const lng = before.location.longitude;
          const dist2 = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat}%2C${lng}&destinations=${userlat}%2C${userlng}&key=AIzaSyD9KatRTU8LVjtXvgL5JHU2PduZMlZd2n4`;

          const response = await axios({
            method: "get",
            url: dist2,
            json: true,
          });

          if (response.status !== 200) {
            return res.status(500).json({ error: error.message });
          }
          var duration = response.data.rows[0].elements[0].duration.text;
          var distance = response.data.rows[0].elements[0].distance.text;
          var carerLocation = response.data.origin_addresses;

          var details = { distance, duration };

          fullBefore = { before, details, carerLocation };
        }

        if (scheduleAfter.length > 0) {
          minAft = scheduleAfter.reduce(function (prev, curr) {
            return prev.timeDiff < curr.timeDiff ? prev : curr;
          });
          after = await Schedules.findOne({
            _id: minAft.scheduleId,
            userId: minAft.userId,
          });
          const userlat = userLocation.latitude;
          const userlng = userLocation.longitude;
          const lat = before.location.latitude;
          const lng = before.location.longitude;
          const dist2 = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat}%2C${lng}&destinations=${userlat}%2C${userlng}&key=AIzaSyD9KatRTU8LVjtXvgL5JHU2PduZMlZd2n4`;

          const response = await axios({
            method: "get",
            url: dist2,
            json: true,
          });

          if (response.status !== 200) {
            return res.status(500).json({ error: error.message });
          }
          var duration = response.data.rows[0].elements[0].duration.text;
          var distance = response.data.rows[0].elements[0].distance.text;
          var carerLocation = response.data.origin_addresses;
          var details = { distance, duration };
          fullAfter = { after, details, carerLocation };
        }

        return { user: schedule, Before: fullBefore, After: fullAfter };
      })
    );

    const allCarers = await Staff.find({ role: "carer" });
    if (!allCarers.length === 0 || allCarers) {
      return res.status(404).json({ error: "No carers found" });
    }
    const availableCarers = await Promise.all(
      allCarers.map(async (carer) => {
        const schedules = await Schedules.find({ carerId: carer._id });
        if (!schedules || schedules.length === 0) return carer;
      })
    );

    const carersToSend = await Promise.all(
      availableCarers.map(async (carer) => {
        const userlat = userLocation.latitude;
        const userlng = userLocation.longitude;
        const lat = carer.geoLocation.coordinates.latitude;
        const lng = carer.geoLocation.coordinates.longitude;
        const dist2 = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat}%2C${lng}&destinations=${userlat}%2C${userlng}&key=AIzaSyD9KatRTU8LVjtXvgL5JHU2PduZMlZd2n4`;

        const response = await axios({
          method: "get",
          url: dist2,
          json: true,
        });
        if (response.status !== 200) {
          return res.status(500).json({ error: error.message });
        }
        var duration = response.data.rows[0].elements[0].duration.text;
        var distance = response.data.rows[0].elements[0].distance.text;
        var carerLocation = response.data.origin_addresses;
        var details = { distance, duration, carerLocation };
        return { carer, details: details };
      })
    );

    res.status(200).json({
      avaliableUser: beforeAfterSchedules,
      usersWithNoSchedules: carersToSend,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
