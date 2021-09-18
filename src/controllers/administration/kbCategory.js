const kbCategory = require("../../models/administration/kbCategory");

exports.addCategory = async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res
      .status(406)
      .json({ error: "Enter a valid Knowledge base category name" });
  }

  try {
    const existingCategory = await kbCategory.findOne({
      categoryName: categoryName,
    });

    if (existingCategory) {
      return res
        .status(406)
        .json({ error: "This knowledge base category already exists" });
    }

    const newCategory = new kbCategory(req.body);
    const savedCategory = await newCategory.save();
    res.status(200).json({
      message: "Knowledge base category saved successfully",
      savedCategory: savedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.editCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { categoryName } = req.body;
  if (!categoryName) {
    return res
      .status(406)
      .json({ error: "Enter a valid Knowledge base category name" });
  }

  try {
    const existingCategory = await kbCategory.findOne({ _id: categoryId });
    if (!existingCategory) {
      return res
        .status(404)
        .json({ error: "This knowledge base category does not exist" });
    }

    const query = { $set: req.body };

    const updatedCategory = await kbCategory.findOneAndUpdate(
      { _id: categoryId },
      query,
      { new: true }
    );

    res.status(200).json({
      message: "Knowledge base category has been updated successfully",
      updatedCategory: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const existingCategory = await kbCategory.findOne({
      _id: categoryId,
    });
    if (!existingCategory) {
      return res
        .status(404)
        .json({ error: "This knowledge base category does not exist" });
    }

    res.status(200).json({
      category: existingCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewAllCategories = async (req, res) => {
  try {
    const categories = await kbCategory.find();
    if (!categories || !categories.length) {
      return res.status(404).json({
        error:
          "You have not added any knowledge base categories. May be add one?",
      });
    }

    res.status(200).json({
      message: `you have ${categories.length} knowledge base categories`,
      categories: categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteCategories = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const existingCategory = await kbCategory.findOne({
      _id: categoryId,
    });
    if (!existingCategory) {
      return res
        .status(404)
        .json({ error: "This knowledge base category does not exist" });
    }

    await existingCategory.remove();

    res
      .status(200)
      .json({ message: "Knowledge base category has been removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
