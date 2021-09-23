const mongoose = require("mongoose");

const schedulesSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "endusers" },
  carerId: {
    type: Schema.Types.ObjectId,
    ref: "Staff",
    default: "not assigned",
  },
  past: { type: Boolean, default: false },
  from: { type: Date },
  to: { type: Date },
  userLocation: [Number],
  job: "plumping",
});

const Schedules = new mongoose.model("Schedules", schedulesSchema);
module.exports = Schedules;
