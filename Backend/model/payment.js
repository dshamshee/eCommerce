const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    paymentID:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    orderID:{
        type: String,
    },
    method:{
        type: String,
    },
    userOrderID:{
        type: String,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Payment", paymentSchema);
