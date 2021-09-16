const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceCode: { type: Number, required: true },
  weekdayEarly: { type: Number, required: true },
  weekdayNormal: { type: Number, required: true },
  weekdayLate: { type: Number, required: true },
  weekendEarly: { type: Number, required: true },
  weekendNormal: { type: Number, required: true },
  weekendLate: { type: Number, required: true },
  publicHolidayEarly: { type: Number, required: true },
  publicHolidayNormal: { type: Number, required: true },
  publicHolidayLate: { type: Number, required: true },
  tax: { type: Number, required: true },
});

const Services = new mongoose.model("Services", servicesSchema);
module.exports = Services;
