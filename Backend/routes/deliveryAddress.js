const express = require("express");
const router = express.Router();
const deliveryAddressModel = require("../model/deliveryAddress");
const isLoggedIn = require("../middleware/isLoggedIn");


// Add delivery address
router.post('/add-delivery-address', isLoggedIn, async(req, res)=>{

    try {
        const {name, address, city, state, zipCode, phone, isDefault} = req.body;
        const deliveryAddress = await deliveryAddressModel.create({
            userId: req.user._id,
            name,
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
router.get('/get-all-delivery-addresses', isLoggedIn, async(req, res)=>{

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
        const {name, address, city, state, zipCode, phone, isDefault} = req.body;
        const deliveryAddress = await deliveryAddressModel.findByIdAndUpdate(req.params.id, {
            name,
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


// Get Delivery Address by id
router.get('/get-delivery-address/:id', isLoggedIn, async(req, res)=>{
    try {
        const deliveryAddress = await deliveryAddressModel.find({_id: req.params.id, userId: req.user._id});
        if(!deliveryAddress){
            return res.status(404).json({message: "Delivery address not found"});
        }
        return res.status(200).json({message: "Delivery address fetched successfully", deliveryAddress});
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