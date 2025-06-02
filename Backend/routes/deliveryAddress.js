const express = require("express");
const router = express.Router();
const deliveryAddressModel = require("../model/deliveryAddress");
const isLoggedIn = require("../middleware/isLoggedIn");


// Add delivery address
router.post('/add-delivery-address', isLoggedIn, async(req, res)=>{

    try {
        const {address, city, state, zipCode, phone, isDefault} = req.body;
        const deliveryAddress = await deliveryAddressModel.create({
            userId: req.user._id,
            address,
            city,
            state,
            zipCode,
            phone,
            isDefault,
        })
        return res.status(200).json({message: "Delivery address added successfully", deliveryAddress});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// Get all Delivery Addresses
router.get('/get-all-deliver-addresses', isLoggedIn, async(req, res)=>{

    try {
        const deliveryAddresses = await deliveryAddressModel.find({userId: req.user._id});
        return res.status(200).json({message: "Delivery addresses fetched successfully", deliveryAddresses});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// Update Delivery Address
router.post('/update-delivery-address/:id', isLoggedIn, async(req, res)=>{

    try {
        const {address, city, state, zipCode, phone, isDefault} = req.body;
        const deliveryAddress = await deliveryAddressModel.findByIdAndUpdate(req.params.id, {
            address,
            city,
            state,
            zipCode,
            phone,
            isDefault,
        }, {new: true});
        return res.status(200).json({message: "Delivery address updated successfully", deliveryAddress});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// Delete Delivery Address
router.get('/delete-delivery-address/:id', isLoggedIn, async(req, res)=>{

    try {
        await deliveryAddressModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Delivery address deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

module.exports = router;