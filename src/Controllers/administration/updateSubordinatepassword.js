const HResources = require("../../Models/administration/HResources");
const Finance = require("../../Models/administration/Finance");
const Manager = require("../../Models/administration/Manager");
const Support = require("../../Models/administration/Support");
const Carer = require("../../Models/administration/carer");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    userValidation,
    updateValidation,
    passwordValidation,
} = require("../../Services/validation");


exports.updateHrPasswords = async (req, res) => {
    const hrId = req.params.hrId;
    const { error } = passwordValidation(req.body);
    if (error) {
        return res.status(406).json({ message: error.details[0].message });
    }

    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ error: "Passwords not matching." });
    }

    const updates = Object.keys(req.body);

    const allowUpdates = ["password", "password2"];

    const isValidOperation = updates.every((update) =>
        allowUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid Operation" });
    }

    try {
        
        const existingHr = await HResources.findOne({ _id: hrId });
        if (!existingHr) {
            return res.status(404).json({ error: "hr does not exist" });
        }


        const password = req.body.password;
        if (password) {
            const hashedPass = await bcrypt.hash(password, 10);
            req.body.password = hashedPass;
        }

        //   query
        let query = { $set: {} };
        for (let key in req.body) {
            if (existingHr[key] && existingHr[key] !== req.body[key])
                // if the field we have in req.body exists, we're gonna update it
                query.$set[key] = req.body[key];
        }
        const updatedHr = await HResources.updateOne({ _id: hrId }, query);
        res.status(200).json({ message: "Password updated Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateFinancePasswords = async (req, res) => {
    const financeId = req.params.financeId;

    const { error } = passwordValidation(req.body);
    if (error) {
        return res.status(406).json({ error: error.details[0].message });
    }

    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ error: "Passwords not matching." });
    }

    const updates = Object.keys(req.body);

    const allowUpdates = ["password", "password2"];

    const isValidOperation = updates.every((update) =>
        allowUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid Operation" });
    }

    try {
        const existingFinance = await Finance.findOne({ _id: financeId });
        if (!existingFinance) {
            return res.status(404).json({ error: "Finance does not exist" });
        }

        const password = req.body.password;
        if (password) {
            const hashedPass = await bcrypt.hash(password, 10);
            req.body.password = hashedPass;
        }

        //   query
        let query = { $set: {} };
        for (let key in req.body) {
            if (existingFinance[key] && existingFinance[key] !== req.body[key])
                // if the field we have in req.body exists, we're gonna update it
                query.$set[key] = req.body[key];
        }

        const updatedFinance = await Finance.updateOne({ _id: financeId }, query);
        res.status(200).json({ message: "Password updated Successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateManagerPasswords = async (req, res) => {
    const managerId = req.params.managerId;

    const { error } = passwordValidation(req.body);
    if (error) {
        return res.status(406).json({ error: error.details[0].message });
    }

    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ error: "Passwords not matching." });
    }

    const updates = Object.keys(req.body);

    const allowUpdates = ["password", "password2"];

    const isValidOperation = updates.every((update) => allowUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid Operation" });
    }

    try {

        const existingManager = await Manager.findOne({ _id: managerId });
        if (!existingManager) {
            return res.status(404).json({ error: "Manager does not exist" });
        }

        const password = req.body.password;
        if (password) {
            const hashedPass = await bcrypt.hash(password, 10);
            req.body.password = hashedPass;
        }

        //   query
        let query = { $set: {} };
        for (let key in req.body) {
            if (existingManager[key] && existingManager[key] !== req.body[key])
                // if the field we have in req.body exists, we're gonna update it
                query.$set[key] = req.body[key];
        }

        const updatedManager = await Manager.updateOne({ _id: managerId }, query);
        res.status(200).json({ message: "Password updated Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateSupportPasswords = async (req, res) => {
    const supportId = req.params.supportId;

    const { error } = passwordValidation(req.body);
    if (error) {
        return res.status(406).json({ error: error.details[0].message });
    }

    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ error: "Passwords not matching." });
    }

    const updates = Object.keys(req.body);

    const allowUpdates = ["password", "password2"];

    const isValidOperation = updates.every((update) => allowUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: "Invalid Operation" });
    }

    try {

        const existingSupport = await Support.findOne({ _id: supportId });
        if (!existingSupport) {
            return res.status(404).json({ error: "Manager does not exist" });
        }

        const password = req.body.password;
        if (password) {
            const hashedPass = await bcrypt.hash(password, 10);
            req.body.password = hashedPass;
        }

        //   query
        let query = { $set: {} };
        for (let key in req.body) {
            if (existingSupport[key] && existingSupport[key] !== req.body[key])
                // if the field we have in req.body exists, we're gonna update it
                query.$set[key] = req.body[key];
        }

        const updatedSupport = await Support.updateOne({ _id: supportId }, query);
        res.status(200).json({ message: "Password updated Successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
