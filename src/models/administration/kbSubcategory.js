const mongoose = require("mongoose");

const kbSubcategorySchema = new mongoose.Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: "kbCategory" },
  subcategoryName: { type: String, required: true },
  dataPath: { type: String },
  text: { type: String },
});

const kbSubcategory = new mongoose.model("kbSubcategory", kbSubcategorySchema);
module.exports = kbSubcategory;
