const router = require("express").Router();
const {
  addCategory,
  deleteCategories,
  editCategory,
  viewAllCategories,
  viewCategory,
} = require("../../controllers/administration/kbCategory");

/**
 * @description add a category
 * @method POST
 * @route /add
 **/
router.post("/add", addCategory);

/**
 * @description edit a category
 * @method POST
 * @route /update/:categoryId
 **/
router.post("/update/:categoryId", editCategory);

/**
 * @description view a category
 * @method GET
 * @route /view/:categoryId
 **/
router.get("/view/:categoryId", viewCategory);

/**
 * @description view all category
 * @method GET
 * @route /view/all
 **/
router.get("/view/all/categories", viewAllCategories);

/**
 * @description delete a category
 * @method GET
 * @route /remove/:categoryId
 **/
router.get("/remove/:categoryId", deleteCategories);

module.exports = router;
