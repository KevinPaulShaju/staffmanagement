const KbSubcategory = require("../../models/administration/kbSubcategory");
const KbCategory = require("../../models/administration/kbCategory");

exports.addSubcategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { subcategoryName } = req.body;
  if (!subcategoryName) {
    return res.status(406).json({ error: "Enter a valid Knowledge base sub category name" });
  }
  try {
    const existingCategory = await KbCategory.findOne({ _id: categoryId });
    if (!existingCategory) {
      return res.status(404).json({ error: "Knowledge base Category does not exist" });
    }

    const newSubCategory = new KbSubcategory({categoryId,subcategoryName,});

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
  const subCategoryId = req.params.subCategoryId;
  const { subcategoryName } = req.body;
  if (!subcategoryName) {
    return res
      .status(406)
      .json({ error: "Enter a valid Knowledge base sub category name" });
  }
  try {
    const existingSubCategory = await KbSubcategory.findOne({
      _id: subCategoryId,
    });

    if (!existingSubCategory) {
      return res
        .status(404)
        .json({ error: "Knowledge base sub category does not exist" });
    }
    const query = { $set: req.body };

    const updatedSubCategory = await KbSubcategory.findOneAndUpdate(
      { _id: subCategoryId },
      query,
      { new: true }
    );

    res.status(200).json({
      message: "Knowledge base sub category has been updated successfully",
      updatedSubCategory: updatedSubCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewSubcategory = async (req, res) => {
  const subCategoryId = req.params.subCategoryId;
  try {
    const existingSubCategory = await KbSubcategory.findOne({
      _id: subCategoryId,
    });

    if (!existingSubCategory) {
      return res
        .status(404)
        .json({ error: "Knowledge base sub category does not exist" });
    }

    res.status(200).json({ subcategory: existingSubCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewSubcategoryByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const existingCategory = await KbCategory.findOne({ _id: categoryId });
    if (!existingCategory) {
      return res.status(404).json({ error: "This knowledge base category does not exist" });
    }

    const subcategoryByCategory = await KbSubcategory.find({
      categoryId: categoryId,
    });

    if (!subcategoryByCategory || subcategoryByCategory.length === 0) {
      return res.status(404).json({error:"You have not added any knowledge base categories. May be add one?"});
    }
    res.status(200).json({
      message: `you have ${subcategoryByCategory.length} knowledge base categories`,
      subcategoryByCategory: subcategoryByCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeSubcategory = async (req, res) => {
  const subCategoryId = req.params.subCategoryId;
  try {
    const existingSubCategory = await KbSubcategory.findOne({
      _id: subCategoryId,
    });

    if (!existingSubCategory) {
      return res
        .status(404)
        .json({ error: "Knowledge base sub category does not exist" });
    }

    await existingSubCategory.remove();
    res.status(200).json({ message: "Sub category has been removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
