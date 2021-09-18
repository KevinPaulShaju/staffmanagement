const express = require("express");
const router = express.Router();
const {kbDocuments} = require("../../helpers/photo")
const Subcategory = require("../../models/administration/kbSubcategory");


router.post("/add/:subCategoryId",kbDocuments.single('document'),async (req, res)=>{
    try {
        const _id = req.params.subCategoryId;
        const document = req.body
        if(!_id){
            return res.status(400).json({error:"Subcategory Id Should be Provided"});
        }
        const findSubcategory = await Subcategory.findOne({_id});
        if(!findSubcategory){
            return res.status(404).json({error:"Subcategory Not Found"});
        }
        if(!req.file){
            console.log(document)
        }

        // console.log(req.file)
        findSubcategory.dataPath = `http://localhost:5000/kbdocuments/${req.file.filename}`;
        findSubcategory.save();
        res.status(200).json({success:1, message:"Document saved successfully",result:findSubcategory.dataPath});

        
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        });
    }
});


module.exports = router;