const Schedules = require("../../models/schedules/schedules");
const EndUser = require("../../models/user/user");
const router = require("../../routes/schedules/schedules");

exports.viewAllSchedules = async (req, res) => {
    try {
        const viewSchedules = await Schedules.find({});
        if(viewSchedules.length === 0){
            return res.status(404).json({error: "No Schedules Found."});
        }

        res.status(200).json({schedules: viewSchedules});

    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}


exports.viewASchedule = async (req, res) => {
    try {
        const _id = req.params.scheduleId
        const findSchedule = await Schedules.findOne({ _id });
        if(!findSchedule){
            return res.status(404).json({error: "Schedule Not Found."})
        }
        res.status(200).json({message: findSchedule})
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.viewAllSchedulesOfaUser = async(req, res)=>{
    try {
        const userId = req.params.userId;
       
        const findUser = await EndUser.findOne({ _id:userId });
        if(!findUser){
            return res.status(404).json({error:"User Not Found."})
        }

        const findSchedules = await Schedules.find({ userId });
        if(!findSchedules || findSchedules.length === 0){
            return res.status(404).json({error:"No Schedules found"})
        }

        res.status(200).json({
            message: `${findUser.firstName} has ${findSchedules.length} no of Schedules`,
            schdules:findSchedules
        });
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}


exports.getSchedulesByUserIdandScheduleId = async (req, res) => {
    try {
        const userId= req.query.userId;
        const scheduleId= req.query.scheduleId;
        if(!userId || !scheduleId) {
           return res.status(404).json({ error: "Both userId and scheduleId are required"})
        }
        const findSchedule = await Schedules.findOne({ _id:scheduleId, userId });
        if(!findSchedule){
            return res.status(404).json({ error: "Schedule Not Found."})
        }
        res.status(200).json({schedule:findSchedule});
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}


exports.createASchedule = async (req, res) => {
    try {
        const _id = req.params.userId;
        const {from,to,userLocation,job} = req.body;
        const findUser = await EndUser.findOne({ _id});

        if(!findUser){
            return res.status(404).json({error:"User Not Found"});
        }
        if(!from || !to || !userLocation || !job){
            return res.status(400).json({error:"All The Fields are Required."})
        }
        console.log(from-to)
        if(from === to) {
            return res.status(400).json({error:"From Time & To Time Can not be Same"});
        }

        const schedule = new Schedules({
            userId:_id,
            ...req.body,
        });
        const savedSchedule = await schedule.save();
        return res.status(200).json({schedule:savedSchedule});

    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}


exports.updateForHigherOffcials = async (req, res) => {
    try {
        const _id = req.params.scheduleId;
        const {carerId,past,from,to,userLocation,job} = req.body;
        const findSchedule = await Schedules.findOne({ _id})
        if(!findSchedule){
            return res.status(404).json({error:"Schedule Not Found"})
        }
        if(from === to){
            return res.status(400).json({error:"From & To Time Can not be Same"});
        }

        let query = {
            $set: req.body,
        }

        const updateSchedule = await Schedules.findOneAndUpdate({_id},query,{ new: true })
        res.status(200).json({
            message:"Schedule updated successfully",
            result: updateSchedule
        })
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.updateForUsers = async (req, res) => {
    try {
        const _id = req.params.scheduleId;
        const {from,to,userLocation,job} = req.body;
        const findSchedule = await Schedules.findOne({ _id})
        
        if(!from || !to || !userLocation || !job){
            return res.status(400).json({error:"All The Fields are Required."})
        }
        if(!findSchedule){
            return res.status(404).json({error:"Schedule Not Found"})
        }
        if(from === to){
            return res.status(400).json({error:"From & To Time Can not be Same"});
        }

        let query = {
            $set: req.body,
        }

        const updateSchedule = await Schedules.findOneAndUpdate({_id},query,{ new: true })
        res.status(200).json({
            message:"Schedule updated successfully",
            result: updateSchedule
        })
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}

exports.toRemoveAllSchedulesofAUser = async (req, res) => {
    try {
        const _id = req.params.userId;
        const findUser = await EndUser.findOne({ _id})
        if (!findUser) {
            return res.status(404).json({error:"User Not Found"})
        }
        const findSchedules = await Schedules.find({userId: _id});
        if (!findSchedules || findSchedules.length === 0) {
            return res.status(404).json({error:"No Schedules Found."})
        }

        await Schedules.deleteMany({userId: _id})
        res.status(200).json({message:"All Schedules deleted successfully"})
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}


exports.toRemoveaSchedule = async (req,res) => {
    try {
        const _id = req.params.scheduleId;
        const findSchedule = await Schedules.findOne({ _id});
        if(!findSchedule){
            return res.status(404).json({error:"Schdeule Not Found."})
        }
        await findSchedule.remove();
        res.status(200).json({message: "Schedule removed successfully"})
    } catch (e) {
        res.status(500).json({
            error: e.message,
            message: "Internal Server Error"
        })
    }
}