const mongoose = require("mongoose");

const DocTypeSchema = new mongoose.Schema({
  documentType: { type: "string", required: true },
});

const DocType = new mongoose.model("DocType", DocTypeSchema);
module.exports = DocType;
