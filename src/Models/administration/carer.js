const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const carerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{ 
        type: String,
        required: true
    }, 
    phone:{
        type:String,
        required: true,
    },
    gender:{
        type:String,
        required: true,
        enum: ["male", "female", "other"]
    },
    DOB:{
        type: Date
    },
    address:{
        type: String,
    },
    role:{ 
        type: String,
        default: "carer"
    },
    location:{ 
        type: String,
    },
    languageSpoken:{
        type: String,
    },
    emergencyContactName:{
        type: String,
    },
    emergencyContactNumber:{
        type: String,
    },
    emergencyContactRelationship:{
        type: String,
    },
    emergencyContactAddress:{
        type: String,
    },
    secondaryContactName:{
        type: String,
    },
    secondaryContactNumber:{
        type: String,
    },
    secondaryContactRelationship:{
        type: String,
    },
    secondaryContactAddress:{
        type: String,
    },
    taxFileNumber:{
        type: String,
    },
    maidenName:{
        type: String,
    },
    preferredName:{
        type: String,
    }
})


carerSchema.pre("save", async function (next){

    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    
    next();
})
  

const Carer = mongoose.model("carer", carerSchema);
module.exports = Carer;