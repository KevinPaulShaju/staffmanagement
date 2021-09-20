const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kbSubcategorySchema = new mongoose.Schema({
  categoryId: { type: Schema.Types.ObjectId, ref: "kbCategory" },
  subcategoryName: { type: String, required: true },
  documents: { type: String,default:null },
  links: { type: String,default:null },
  content: { type: String,default:null },
});

const kbSubcategory = new mongoose.model("kbSubcategory", kbSubcategorySchema);
module.exports = kbSubcategory;
