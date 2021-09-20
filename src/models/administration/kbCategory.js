const mongoose = require("mongoose");
const subCategory = require("./kbSubcategory");

const kbCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
});


kbCategorySchema.pre("remove", async function (next){
  await subCategory.deleteMany({categoryId:this.id});
  next();
})


const kbCategory = new mongoose.model("kbCategory", kbCategorySchema);
module.exports = kbCategory;
