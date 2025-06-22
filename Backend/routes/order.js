const express = require("express");
const router = express.Router();
const orderModel = require("../model/order");
const isLoggedIn = require("../middleware/isLoggedIn");

// Create order
router.post("/create-order", isLoggedIn, async(req, res)=>{
    try {
        const {products, totalAmount, deliveryAddress, paymentMethod} = req.body;
        const order = await orderModel.create({
            userId: req.user._id,
            products: products.map((product)=>({
                productId: product.productId,
                quantity: product.quantity,
            })), // array of product id and quantity [{productId: "123", quantity: 2}]
            totalAmount,
            deliveryAddress, // delivery address id
            paymentMethod,
        });
        return res.status(200).json({message: "Order created successfully", order});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// Get all orders
router.get('/get-all-orders', isLoggedIn, async(req, res)=>{

    try {
        const orders = await orderModel.find({userId: req.user._id}).populate("products");
        return res.status(200).json({message: "Orders fetched successfully", orders});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// Get order by id
router.get('/get-order/:id', isLoggedIn, async(req, res)=>{

    try {
        const order = await orderModel.findOne({_id: req.params.id, userId: req.user._id}).populate("products");
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json({message: "Order fetched successfully", order});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// Update order status 
router.post('/update-order-status/:id', isLoggedIn, async(req, res)=>{

    try {
        const {status} = req.body;
        const order = await orderModel.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, {status}, {new: true});
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json({message: "Order status updated successfully", order});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// Delete order | only for admin 
router.get('/delete-order/:id', isLoggedIn, async(req, res)=>{

    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Unauthorized"});
        }
        const order = await orderModel.findOneAndDelete(req.params.id);
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json({message: "Order deleted successfully", order});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// Cancel order 
router.get('/cancel-order/:id', isLoggedIn, async(req, res)=>{

    try {
        const order = await orderModel.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, {status: "cancelled"}, {new: true});
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json({message: "Order cancelled successfully", order});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})



module.exports = router;

