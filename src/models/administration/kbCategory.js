const mongoose = require("mongoose");

const kbCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
});

const kbCategory = new mongoose.model("kbCategory", kbCategorySchema);
module.exports = kbCategory;
