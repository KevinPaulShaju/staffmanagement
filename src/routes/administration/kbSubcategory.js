const router = require("express").Router();
const {
  addSubcategory,
  editSubcategory,
  removeSubcategory,
  viewSubcategory,
  viewSubcategoryByCategory,
} = require("../../controllers/administration/kbSubcategory");

/**
 * @description add a sub category
 * @method POST
 * @route /add/:categoryId
 **/
router.post("/add/:categoryId", addSubcategory);

/**
 * @description edit a sub category
 * @method POST
 * @route /update/:subCategoryId
 **/
router.post("/update/:subCategoryId", editSubcategory);

/**
 * @description view a sub category
 * @method GET
 * @route /view/:subCategoryId
 **/
router.get("/view/:subCategoryId", viewSubcategory);

/**
 * @description view all sub category
 * @method GET
 * @route /view/all/subcategories/:categoryId
 **/
router.get("/view/all/subcategories/:categoryId", viewSubcategoryByCategory);

/**
 * @description delete a sub category
 * @method GET
 * @route /remove/:subCategoryId
 **/
router.get("/remove/:subCategoryId", removeSubcategory);

module.exports = router;
