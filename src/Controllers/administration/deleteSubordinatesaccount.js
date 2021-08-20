const HResources = require("../../Models/administration/HResources");
const Finance = require("../../Models/administration/Finance");
const Manager = require("../../Models/administration/Manager");
const Support = require("../../Models/administration/Support");
const Carer = require("../../Models/administration/carer");


exports.deleteHrAccount = async (req, res) => {
    const hrId = req.params.hrId;

    try {

        const existingHr = await HResources.findOne({ _id: hrId });
        if (!existingHr) {
            return res.status(404).json({ error: "hr does not exist" });
        }
        await existingHr.remove();
        res.status(200).json({ message: "hr Account Deleted" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

};


exports.deleteManagerAccount = async (req, res) => {

    const managerId = req.params.managerId;

    try {

        const existingManager = await Manager.findOne({ _id: managerId });

        if (!existingManager) {
            return res.status(404).json({ error: "Manager does not exist" });
        }

        await existingManager.remove();
        res.status(200).json({ message: "manager Account Deleted" });

    } catch (e) {

        res.status(500).json({ error: e.message });
    }
};


exports.deleteFinanceAccount = async (req, res) => {
    const financeId = req.params.financeId;

    try {
        const existingFinance = await Finance.findOne({ _id: financeId });

        if (!existingFinance) {
            return res.status(404).json({ error: "Finance does not exist" });
        }

        await existingFinance.remove();
        res.status(200).json({ message: "Finance Account Deleted" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

exports.deleteSupportAccount = async (req, res) => {

    const supportId = req.params.supportId

    try {

        const existingSupport = await Support.findOne({ _id: supportId });

        if (!existingSupport) {
            return res.status(404).json({ error: "Support does not exist" });
        }

        await existingSupport.remove();
        res.status(200).json({ message: "Support Account Deleted" });

    } catch (e) {

        res.status(500).json({ error: e.message });
    }
};