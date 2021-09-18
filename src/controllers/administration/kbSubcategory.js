const KbSubcategory = require("../../models/administration/kbSubcategory");
const KbCategory = require("../../models/administration/kbCategory");

exports.addSubcategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { subcategoryName } = req.body;
  if (!subcategoryName) {
    return res
      .status(406)
      .json({ error: "Enter a valid Knowledge base sub category name" });
  }
  try {
    const existingCategory = await KbCategory.findOne({ _id: categoryId });
    if (!existingCategory) {
      return res
        .status(404)
        .json({ error: "Knowledge base Category does not exist" });
    }

    const newSubCategory = new KbSubcategory({
      categoryId,
      subcategoryName,
    });

    const savedSubCategory = await newSubCategory.save();
    res.status(200).json({
      message: "Knowledge base sub category saved successfully",
      savedSubCategory: savedSubCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.editSubcategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewSubcategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewSubcategoryByCategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.removeSubcategory = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
