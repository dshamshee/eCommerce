const express = require("express");
const router = express.Router();
const cartModel = require("../model/cart");
const orderModel = require("../model/order");
const productModel = require("../model/product");
const paymentModel = require("../model/payment");
const razorpay = require("razorpay");
const isLoggedIn = require("../middleware/isLoggedIn");

// razorpay instance (Admin Credentials)
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// router.post('/create-checkout-session', isLoggedIn, async(req, res)=>{

//     try {
//         const userId = req.user._id;
//         const cart = await cartModel.findOne({userId}).populate('products.productId');
//         if(!cart){
//             return res.status(404).json({message: "Cart not found"});
//         }

//         // check if cart is empty
//         if(cart.products.length === 0){
//             return res.status(400).json({message: "Cart is empty"});
//         }

//         // create order
//         const order = await orderModel.create({
//             userId,
//             products: cart.products,
//             totalPrice: cart.totalPrice,
//             status: "pending",
//         })

//         // create checkout session
//         // const session = await stripe.checkout.sessions.create({
//         //     payment_method_types: ['card'],
//         //     line_items: cart.products.map(p=>({
//         //         price_data: {

//         //         }
//         //     }))
//         // })
        
//     } catch (error) {
//         return res.status(500).json({message: error.message});
//     }
// })




// create order
router.post('/create-order', isLoggedIn, async(req, res)=>{

    const options={
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: `order_${Date.now()}`,
        payment_capture: 1,
    }

    try {
        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({order});
    } catch (error) {
        res.status(500).json({message: "Order not created",error: error.message});
    }
})


// Fetch Payment Details
router.post('/fetch-payment', isLoggedIn, async(req, res)=>{

    const {paymentID, orderID} = req.body;

    try {
        const payment = await razorpayInstance.payments.fetch(paymentID);
        if(!payment){
            res.status(404).json({message: "Payment not found"});
        }

        const paymentDetails = await paymentModel.create({
            userId: req.user._id,
            paymentID: payment.id,
            amount: payment.amount/100,
            currency: payment.currency,
            status: payment.status === "captured" ? "completed" : "pending",
            orderID: payment.order_id || "Not Found",
            method: payment.method || "Not Found",
            userOrderID: orderID
        })

        res.status(200).json({paymentDetails});
    } catch (error) {
        res.status(500).json({message: "Payment not found",error: error.message});
    }
})

// Get all Payments 
router.get('/get-all-payments', isLoggedIn, async (req, res)=>{

    try {
        if(req.user.role === "admin"){
            const payments = await paymentModel.find()
            res.status(200).json({payments})
        }else{
            res.status(403).json({message: "You are not authorized to access this resource"})
        }
    } catch (error) {
        
    }
})
module.exports = router;
