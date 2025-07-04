const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
            default: 1,
        }
    }],
    paymentMethod:{
        type: String,
        enum: ["cash", "card", "upi"],
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
        enum: ["pending", "confirmed", "shipped", "Delivered", "cancelled"],
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
