const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products:{ // array of product ids
        type: Array,
        required: true,
    },
    totalAmount:{
        type: Number,
        required: true,
    },
    deliveryAddress:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryAddress",
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
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

module.exports = mongoose.model("Order", orderSchema);
