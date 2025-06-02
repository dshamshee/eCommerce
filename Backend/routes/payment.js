const express = require("express");
const router = express.Router();
const cartModel = require("../model/cart");
const orderModel = require("../model/order");
const productModel = require("../model/product");


router.post('/create-checkout-session', isLoggedIn, async(req, res)=>{

    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({userId}).populate('products.productId');
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        // check if cart is empty
        if(cart.products.length === 0){
            return res.status(400).json({message: "Cart is empty"});
        }

        // create order
        const order = await orderModel.create({
            userId,
            products: cart.products,
            totalPrice: cart.totalPrice,
            status: "pending",
        })

        // create checkout session
        // const session = await stripe.checkout.sessions.create({
        //     payment_method_types: ['card'],
        //     line_items: cart.products.map(p=>({
        //         price_data: {

        //         }
        //     }))
        // })
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

module.exports = router;
