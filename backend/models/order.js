const mongoose = require("mongoose");

const UptownieSchema = new mongoose.Schema({
    userId: { type: String, required: true },          
    cart: { type: Array, required: true },             
    address: {
        name: String,
        email: String,
        phone: String,                               
        address: String,
        city: String,
        state: String,
        pincode: String
    },
    total: { type: Number, required: true },
    payment: { type: String, enum: ["COD", "Online"], required: true },
    status: { type: String, enum: ["Pending", "Confirmed"], required: true },
    date: { type: Date, default: Date.now }
});

const UptownieModel=mongoose.model("order",UptownieSchema)
module.exports=UptownieModel