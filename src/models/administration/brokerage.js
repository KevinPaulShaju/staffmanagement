const mongoose = require("mongoose");

const BrokerageSchema = new mongoose.Schema({
  name: { type: "string" },
  address: { type: "string" },
  phone: { type: "string" },
});

const Brokerage = new mongoose.model("Brokerage", BrokerageSchema);
module.exports = Brokerage;
