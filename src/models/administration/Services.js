const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceCode: { type: Number, required: true },
  weekdayEarly: { type: Number },
  weekdayEarlyCode: { type: Number },
  weekdayNormal: { type: Number },
  weekdayNormalCode: { type: Number },
  weekdayLate: { type: Number },
  weekdayLateCode: { type: Number },
  weekendEarly: { type: Number },
  weekendEarlyCode: { type: Number },
  weekendNormal: { type: Number },
  weekendNormalCode: { type: Number },
  weekendLate: { type: Number },
  weekendLateCode: { type: Number },
  publicHolidayEarly: { type: Number },
  publicHolidayEarlyCode: { type: Number },
  publicHolidayNormal: { type: Number },
  publicHolidayNormalCode: { type: Number },
  publicHolidayLate: { type: Number },
  publicHolidayLateCode: { type: Number },
  sleepover: { type: Number },
  tax: { type: Number },
});

const Services = new mongoose.model("Services", servicesSchema);
module.exports = Services;
