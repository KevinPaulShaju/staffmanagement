const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schedulesSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "endusers" },
  carerId: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    default: null,
  },
  assigned: { type: Boolean, default: false },
  past: { type: Boolean, default: false },
  from: { type: Date },
  to: { type: Date },
  userLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  job: { type: String },
});

// schedulesSchema.methods.toJSON = function() {
//   const schedule = this
//   const scheduleObject = schedule.toObject()

//   delete scheduleObject.carerId,
//   delete scheduleObject.past

//   return scheduleObject
// }

const Schedules = new mongoose.model("Schedules", schedulesSchema);
module.exports = Schedules;
