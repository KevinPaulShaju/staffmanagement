const Admin = require("../../Models/administration/Admin");
const HR = require("../../Models/administration/HResources");
const Finance = require("../../Models/administration/Finance");
const Manager = require("../../Models/administration/Manager");
const Supports = require("../../Models/administration/Support");


exports.viewHrs = async (req, res) => {
    try{
      const findHrs = await HR.find({}).select("-password");
      if(findHrs.length === 0){
          return res.status(200).json({message:"No HR profile to view"});
      }else{
          return res.status(200).json({messages: findHrs});
      }
    }catch(e){
      res.status(500).json({ error: e.message });
    }
}


exports.viewFinance = async (req, res) => {
  try{
    const findFinance = await Finance.find({}).select("-password");
    if(findFinance.length === 0){
        return res.status(200).json({message:"No Finance profile to view"});
    }else{
        return res.status(200).json({messages: findFinance});
    }
  }catch(e){
    res.status(500).json({ error: e.message });
  }
}


exports.viewManagers = async (req, res) => {
  try{
    const findManager = await Manager.find({}).select("-password");

    if(findManager.length === 0){
        return res.status(200).json({message:"No Managers profile to view"});
    }else{
        return res.status(200).json({messages: findManager});
    }

  }catch(e){
    res.status(500).json({ error: e.message });
  }
}

exports.viewSupports = async (req, res) => {
  try{
    const findSupport = await Supports.find({}).select("-password");

    if(findSupport.length === 0){
        return res.status(200).json({message:"No Supports profile to view"});
    }else{
        return res.status(200).json({messages: findSupport});
    }

  }catch(e){
    res.status(500).json({ error: e.message });
  }
}