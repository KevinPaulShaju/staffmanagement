const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");


exports.registerUsers = async (req, res) => {
    const {
        name,
        email,
        password,
        password2,
        phone,
        gender,
        DOB,
        address,
        role,
        location,
        languageSpoken,
        emergencyContactName,
        emergencyContactNumber,
        emergencyContactRelationship,
        emergencyContactAddress,
        secondaryContactName,
        secondaryContactNumber,
        secondaryContactRelationship,
        secondaryContactAddress,
        taxFileNumber,
        maidenName,
        isNDIC,
        isReffered,
        preferredName,
    } = req.body;

    if (!name || !email || !password || !password2 || !phone || !gender) {
        return res.status(400).json({
            error:
                "name, email, password, password2, phone & gender all fields are required",
        });
    }


    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(406).json({ error: "This User already exists." });
        }

        // confirming passwords
        if (password !== password2) {
            return res.status(406).json({ error: "Passwords do not match." });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(200).json({
            message: `User staff has been successfully registered.`,
            user: savedUser
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};


exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(406).json({ error: "Both Email & Password must be provided" });
    }

    try {
        // checking if the user exists
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ error: "Carer does not exist." });
        }

        //   match password
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        // jwt authorization
        const key = process.env.JWT_SECRET;
        userId = existingUser._id;
        const accessToken = jwt.sign(userId.toString(), key);
        console.log(accessToken);
        res.status(200).json({ accessToken: accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.viewUserProfile = async(req, res) => {
    try {
        
        // const _id = req.user.id;
        const userId = req.params.userId;
        const findUser = await User.findOne({_id:userId}).select("-password");

        if(!findUser) {
            return res.status(404).json({ error: "User Does not exist" });
        }

        res.status(200).json({result:findUser});

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}