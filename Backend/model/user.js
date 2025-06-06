const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: function() {
            return !this.googleId; // Password is required only if googleId is not present
        },
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    googleId: {
        type: String,
        sparse: true, // Allows null/undefined values
        unique: true, // But ensures uniqueness for non-null values
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    cart:{
        type: Array,
        default: [],
    },
    wishlist:{
        type: Array,
        default: [],
    },
    
})

module.exports = mongoose.model("User", userSchema);