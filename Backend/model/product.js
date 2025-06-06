const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: 0,
    },
    category:{
        type: String,
        enum: ["T-shirt", "Shirt", "Jeans", "Shorts"],    
        required: true,
    },
    genderType:{
        type: String,
        enum: ["Men", "Women", "Unisex"],
        required: true,
    },
    sizes:{
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
        required: true,
    },
    colors:{
        type: [String],
        default: ["Black"],
    },
    image:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    isNewProduct:{
        type: Boolean,
        default: false,
    },
    isBestSeller:{
        type: Boolean,
        default: false,
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

module.exports = mongoose.model("Product", productSchema);