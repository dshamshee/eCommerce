const mongoose = require("mongoose");

const ReturnOrderSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    bankDetails: {
        AccountHolderName: {type: String, required: true},
        AccountNumber: {type: String, required: true},
        IFSC: {type: String, required: true},
    },
    status: {
        type: String,
        enum: ["Initiate", "Completed"],
        default: "Initiate",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

module.exports = mongoose.model("ReturnOrder", ReturnOrderSchema);