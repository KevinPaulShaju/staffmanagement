const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    patientId: { type: ObjectId},
    invoiceDate: { type: Date},
    periodFrom: { type: String},
    peroidTo: { type:String},
    dueDate: { type:Date},
    netAmount: { type: Number},
    Tax: { type: Number},
    grossAmount: { type: Number}
})

const Invoice = new mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;