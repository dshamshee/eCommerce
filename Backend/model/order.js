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
        enum: ["Pending", "Confirmed", "Shipped", "Delevered", "Cancelled"],
        default: "Pending",
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
