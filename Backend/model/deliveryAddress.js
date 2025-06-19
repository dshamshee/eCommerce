const mongoose = require("mongoose");

const deliveryAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "India",
    },
    phone: {
        type: String,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("DeliveryAddress", deliveryAddressSchema);
