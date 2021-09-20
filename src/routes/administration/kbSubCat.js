const express = require("express");
var validUrl = require('valid-url');
const router = express.Router();
const {kbDocuments} = require("../../helpers/photo");
const Category = require("../../models/administration/kbCategory");
const Subcategory = require("../../models/administration/kbSubcategory");


router.post("/add/:categoryId",kbDocuments.single("document"),async (req,res) => {
    try {
        const categoryId = req.params.categoryId;
        const { subcategoryName,document } = req.body;
        var newSubCategory,savedSubCategory
        if(!categoryId){
            return res.status(400).json({error: "CategoryId Should be Provided"});
        }
        if (!subcategoryName) {
            return res.status(406).json({ error: "Subcategory Name Should be Provided"});
        }

        const findCategory = await Category.findOne({_id: categoryId});
        if(!findCategory){
            return res.status(404).json({error: "Category Not Found"});
        }
        if(!req.file && !document){
            return res.status(400).json({error: "Either Link Or File You Need To Provide"})
        }

        if(req.file){
            newSubCategory = new Subcategory({
              categoryId,
              subcategoryName,
              dataPath: `http://localhost:5000/kbdocuments/${req.file.filename}`,
            });
            savedSubCategory = await newSubCategory.save();
            return res.status(201).json({
                message: "Sub Document saved successfully",
                result: savedSubCategory
            })
        }

        if(!validUrl.isUri(document)){
          newSubCategory = new Subcategory({
            categoryId,subcategoryName,
            text: document
          })
          savedSubCategory = await newSubCategory.save();
          return res.status(201).json({
            message: "Sub Document saved successfully",
            result: savedSubCategory
          })
        }

        newSubCategory = new Subcategory({
            categoryId,subcategoryName,
            dataPath:document
        });
        savedSubCategory = await newSubCategory.save();
        return res.status(201).json({
            message: "Sub Document saved successfully",
            result: savedSubCategory
        })


    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        });
    }
});






router.get("/view/:subCategoryId",async (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    if (!subCategoryId) {
      return res.status(400).json({ error: "Id Required" });
    }
    try {
      const existingSubCategory = await Subcategory.findOne({
        _id: subCategoryId,
      });
  
      if (!existingSubCategory) {
        return res.status(404).json({ error: "Knowledge base sub category does not exist" });
      }
  
      res.status(200).json({ subcategory: existingSubCategory });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        });
    }
});



/**
 * @description view all sub category
 * @method GET
 * @route /view/all/subcategories/:categoryId
 **/
 router.get("/view/all/subcategories/:categoryId",async (req, res) => {
    const _id = req.params.categoryId;
    if(!_id){
        return res.status(400).json({error:"Category Id Required"})
    }
  
    try {
      const existingCategory = await Category.findOne({ _id });
      if (!existingCategory) {
        return res.status(404).json({ error: "This knowledge base category does not exist" });
      }
  
      const subcategoryByCategory = await Subcategory.find({categoryId: _id});
  
      if (!subcategoryByCategory || subcategoryByCategory.length === 0) {
        return res.status(404).json({error:"You have not added any knowledge base categories. May be add one?"});
      }
      res.status(200).json({
        message: `you have ${subcategoryByCategory.length} knowledge base categories`,
        subcategoryByCategory: subcategoryByCategory,
      });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        });
    }
})



/**
 * @description delete a sub category
 * @method GET
 * @route /remove/:subCategoryId
 **/
 router.get("/remove/:subCategoryId",async (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    try {
      const existingSubCategory = await Subcategory.findOne({_id: subCategoryId});
  
      if (!existingSubCategory) {
        return res.status(404).json({ error: "Knowledge base sub category does not exist" });
      }
  
      await existingSubCategory.remove();
      res.status(200).json({ message: "Sub category has been removed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

module.exports = router;