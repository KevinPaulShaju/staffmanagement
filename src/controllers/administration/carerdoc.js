const CarerDoc = require("../../models/administration/CarerDoc");
const Carer = require("../../models/administration/staff");


exports.createCarerDocument = async(req,res)=>{

    const _id = req.params.carerId;

    if(!_id){
        return res.status(400).json({error:"Carer id should be provided"});
    }

    const {
        policeCheckIssueDate,policeCheckIssuePath,
        wwcCertificateNumber, wwcExpiryDate,
        wccCertificatePath, firstAidIssueDate,
        firstAidIssueDocumentpath, cprIssueDate,
        cprCertificatePath,carRegistrationNumber,
        carRegistrationExpiry, carRegistrationCertificatePath,
        manualHandlingLastRefreshDate, nextSupervisiondate
    } = req.body;

    if(
        !policeCheckIssueDate ||
        !policeCheckIssuePath ||
        !wwcCertificateNumber ||
        !wwcExpiryDate ||
        !wccCertificatePath ||
        !firstAidIssueDate ||
        !firstAidIssueDocumentpath ||
        !cprIssueDate ||
        !cprCertificatePath ||
        !carRegistrationNumber ||
        !carRegistrationExpiry ||
        !carRegistrationCertificatePath ||
        !manualHandlingLastRefreshDate ||
        !nextSupervisiondate
    ){
        return res.status(400).json({error:"All Fields are required"});
    }

    try {
        const findCarer = await Carer.findOne({_id})
        const findDocument = await CarerDoc.findOne({carerId:_id})

        if(!findCarer) {
            return res.status(404).json({error:"Carer does not exist"})
        }

        if(findDocument){
            return res.status(400).json({ message:"Carer Document is Added Already."})
        }

        const newDoc = new CarerDoc({
            carerId: _id,
            ...req.body
        });
        const savedDocument = await newDoc.save();
        findCarer.status = "active"
        await findCarer.save();

        res.status(201).json({
            message:"Document Inserted Successfully",
            result: savedDocument,
        })


    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.viewAllDocuments = async (req, res) => {
    try {
        const findDocuments = await CarerDoc.find();

        if(findDocuments.length === 0){
            return res.status(200).json({message:"No Documents Available."});
        }

        res.status(200).json({message:findDocuments})
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.viewCarerDocument = async(req, res)=>{
    try {
        const carerId = req.query.carerId;
        const _id = req.query.documentId;

        if(!carerId || !_id) {
            return res.status(400).json({message:"Both Carer Id & Document Id are required"});
        }

        const findCarer = await Carer.findOne({_id:carerId});
        const findDocument = await CarerDoc.findOne({_id,carerId});
        console.log(findDocument);

        if(!findCarer){
            return res.status(404).json({message: "No Carer found."});
        }

        if(!findDocument){
            return res.status(404).json({message:"No Document Found."});
        }

        res.status(200).json({message: findDocument});
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.findDocumentByCarerId = async (req, res) => {
    try {

        const _id = req.params.carerId
        if (!_id) {
            return res.status(400).json({ message: "Carer Id Required" });
        }
        const findCarer = await Carer.findOne({_id})
        const findDocument = await CarerDoc.findOne({carerId:_id})

        if(!findCarer){
            return res.status(404).json({ message: "Carer Not Found" });
        }

        if(findCarer && !findDocument){
            return res.status(404).json({ message: "Document Not Registered With This Carer."})
        }
        
        res.status(200).json({ message: findDocument});
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.findDocumentById = async (req, res) => {
    try {
        const _id = req.params.documentId;
        if(!_id){
            return res.status(400).json({error:"Document Id Required"})
        }
        const findDocument = await CarerDoc.findOne({_id})
        if(!findDocument){
            return res.status(404).json({error:"Document Not Found"})
        }
        res.status(200).json({message:findDocument})
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.updateDocumentId = async (req, res)=>{
    const {
        policeCheckIssueDate,policeCheckIssuePath,
        wwcCertificateNumber, wwcExpiryDate,
        wccCertificatePath, firstAidIssueDate,
        firstAidIssueDocumentpath, cprIssueDate,
        cprCertificatePath,carRegistrationNumber,
        carRegistrationExpiry, carRegistrationCertificatePath,
        manualHandlingLastRefreshDate, nextSupervisiondate
    } = req.body;
    try {
        const _id = req.params.documentId;
        if(!_id){
            return res.status(400).json({error:"Document Id Required"})
        }

        const findDocuments = await CarerDoc.findOne({_id});
        if(!findDocuments){
            return res.status(404).json({error:"Document Not Found"})
        }
        let query = {
            $set: req.body,
        };
        const updateDocument = await CarerDoc.findOneAndUpdate({_id},query,{ new: true });
        res.status(200).json({
            message: "Document has been updated successfully",
            result: updateDocument,
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.updateDocumentByCarerId = async (req, res)=>{
    const {
        policeCheckIssueDate,policeCheckIssuePath,
        wwcCertificateNumber, wwcExpiryDate,
        wccCertificatePath, firstAidIssueDate,
        firstAidIssueDocumentpath, cprIssueDate,
        cprCertificatePath,carRegistrationNumber,
        carRegistrationExpiry, carRegistrationCertificatePath,
        manualHandlingLastRefreshDate, nextSupervisiondate
    } = req.body;
    try {
        const carerId = req.params.carerId;
        if(!carerId){
            return res.status(400).json({error:"Carer Id not specified"});
        }
        const findCarer = await Carer.findOne({_id: carerId});
        const findDocument = await CarerDoc.findOne({carerId});
        if(!findCarer) {
            return res.status(404).json({error:"Carer Not Found"});
        }
        if(findCarer && !findDocument) {
            return res.status(404).json({error:"This Carer Does not have Document."})
        }
        let query = {
            $set: req.body,
        };
        const updateDocument = await CarerDoc.findOneAndUpdate({carerId},query,{ new: true });
        res.status(200).json({
            message: "Document has been updated successfully",
            result: updateDocument,
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.deleteByDocumentId = async (req, res) => {
    try {
        const _id = req.params.documentId;
        if(!_id){
            return res.status(400).json({error:"Document Id Required"})
        }

        const findDocuments = await CarerDoc.findOne({_id});
        if(!findDocuments){
            return res.status(404).json({error:"Document Not Found"})
        }
        const removedDocument = await findDocuments.remove()
        res.status(200).json({message: "Document removed successfully"})
    } catch (error) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.deleteByCarerId = async (req, res) => {
    try {
        const carerId = req.params.carerId;
        if(!carerId){
            return res.status(400).json({error:"Carer Id not specified"});
        }
        const findCarer = await Carer.findOne({_id: carerId});
        const findDocument = await CarerDoc.findOne({carerId});
        if(!findCarer) {
            return res.status(404).json({error:"Carer Not Found"});
        }
        if(findCarer && !findDocument) {
            return res.status(404).json({error:"This Carer Does not have Document."})
        }
        const removedDocument = await findDocument.remove()
        res.status(200).json({message:"Document Removed"});
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}