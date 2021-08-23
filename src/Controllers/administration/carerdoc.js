const Carer = require("../../Models/administration/carer");
const CarerDoc = require("../../Models/administration/CarerDoc");
const Manager = require("../../Models/administration/Manager");
const HResources = require("../../Models/administration/HResources");
const Admin = require("../../Models/administration/Admin");


exports.createCarerDoc = async(req,res)=>{

    try {
        const carerId = req.params.carerId;

        const findCarer = await Carer.findOne({_id:carerId});

        if(!findCarer) {
            return res.status(400).json({error: "Carer does not exist."});
        }

        const findCarerDoc = await CarerDoc.findOne({carerId:findCarer.id});

        if(findCarerDoc){
            return res.status(406).json({error:"Document exist with this carer"});
        }

        const {policeCheckIssuePath} = req.body;

        const carerDoc = new CarerDoc ({
            carerId,
            policeCheckIssuePath
        })

        const docs = await carerDoc.save();

        res.status(202).json({message: docs});

    } catch (e) {
        res.status(500).json({error: e.message});
    }
}


exports.viewCarerDocs = async(req, res) => {
    try {
    
        const carerId = req.params.carerId;

        const findCarer = await Carer.findOne({_id:carerId});

        if(!findCarer) {
            return res.status(400).json({error: "Carer does not exist."});
        }

        const carerDoc = await CarerDoc.findOne({carerId:findCarer.id});

        res.status(200).json({message:carerDoc});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

exports.updateCarerDocs = async(req,res) => {
    try {
        const carerId = req.params.carerId;

        const findCarer = await Carer.findOne({_id:carerId});

        if(!findCarer) {
            return res.status(400).json({error: "Carer does not exist."});
        }

        const findCarerDoc = await CarerDoc.findOne({carerId:findCarer.id});

        if(!findCarerDoc){
            return res.status(406).json({error:"Documents does not exist with this carer"});
        }

        //query
        let query = { $set: {} };
        for (let key in req.body) {
            if (findCarerDoc[key] && findCarerDoc[key] !== req.body[key])
                query.$set[key] = req.body[key];
        }

        const updatedCarer = await CarerDoc.updateOne({ carerId:findCarer.id }, query);
        res.status(202).json({ message: updatedCarer });

    } catch (e) {
        res.status(500).json({error: e.message});
    }
}