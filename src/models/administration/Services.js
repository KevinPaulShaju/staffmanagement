const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({

    ServiceName: {type: String, required: true},
    WeekdayEarly: { type: Number},
    WeekdayLate: { type: Number },
    WeekdayNight: { type: Number },
    WeekendEarly: { type: Number },
    WeekendLate: { type: Number },
    WeekendNight: { type: Number },
    Tax: { type: Number}

});


const Services = new mongoose.model("Services", servicesSchema);
module.exports = Services;