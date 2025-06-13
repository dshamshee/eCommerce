const mongoose = require("mongoose");
const { Decimal128 } = require("mongodb");

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
        enum: ["Men", "Women", "Unisex", "Kids"],
        required: true,
    },
    sizes:{
        type: [String],
        enum: ["XS","S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
        required: true,
    },
    colors:{
        type: [String],
        default: ["Black"],
    },
    images: {
        type: [String],
        // required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    isNewProduct:{
        type: Boolean,
        default: false,
    },
    newProductExpiry: {
        type: Date,
        default: null,
    },
    isBestSeller:{
        type: Boolean,
        default: false,
    },
    ratings:{
        type: Decimal128,
        default: new Decimal128("0"),
    },
    reviews:{
        type: Number,
        default: 0,
    },
    fabric:{
        type: String,
        default: "",
    },
    care:{
        type: [String],
        default: [],
    },
    features:{
        type: [String],
        default: [],
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

// Pre-save hook to handle isNewProduct expiry
productSchema.pre('save', function(next) {
    // If isNewProduct is being set to true and newProductExpiry is not set
    if (this.isNewProduct === true && !this.newProductExpiry) {
        // Set expiry date to 7 days from now
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        this.newProductExpiry = expiryDate;
    }
    
    // If there's an expiry date and it has passed, set isNewProduct to false
    if (this.newProductExpiry && new Date() >= this.newProductExpiry) {
        this.isNewProduct = false;
        this.newProductExpiry = null;
    }
    
    next();
});

module.exports = mongoose.model("Product", productSchema);