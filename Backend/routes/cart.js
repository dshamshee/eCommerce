const express = require("express");
const router = express.Router();
const cartModel = require("../model/cart");
const isLoggedIn = require("../middleware/isLoggedIn");
const productModel = require("../model/product");


// Add to cart (send only productId and quantity and no need to calculate anything on frontend)
router.post('/add-to-cart', isLoggedIn, async(req, res)=>{

    try {
        const {productId, quantity} = req.body;
        const userId = req.user._id;

        // check if product exists
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // check if user already has a cart
        let cart = await cartModel.findOne({userId});
        if(!cart){
            cart = await cartModel.create({
                userId,
                products: [{productId, quantity}],
                totalPrice: product.price * quantity,
            })
        }else{
            // check if product already in cart
            const existingProduct = cart.products.find(p=>p.productId.toString() === productId);
            if(existingProduct){
                existingProduct.quantity += parseInt(quantity);
                cart.totalPrice += product.price * parseInt(quantity);
            }else{
                cart.products.push({productId, quantity});
                cart.totalPrice += product.price * parseInt(quantity);
            }
        }
        await cart.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// Get cart items
router.get('/get-cart-items', isLoggedIn, async(req, res)=>{

    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({userId}).populate('products.productId');
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        return res.status(200).json({
            message: "Cart items fetched successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// Update cart item quantity (send productId and quantity)
router.post('/update-cart-item', isLoggedIn, async(req, res)=>{

    try {
        const {productId, quantity} = req.body;
        const userId = req.user._id;

        // check if product exists
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // check if user has a cart
        const cart = await cartModel.findOne({userId});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        // check if product is in cart
        const existingProduct = cart.products.find(p=>p.productId.toString() === productId);
        if(!existingProduct){
            return res.status(404).json({message: "Product not in cart"});
        }

        // update quantity
        existingProduct.quantity = parseInt(quantity);
        
        // Calculate total price by summing up all products in cart
        let totalPrice = 0;
        for (const item of cart.products) {
            const productDetails = await productModel.findById(item.productId);
            totalPrice += productDetails.price * item.quantity;
        }
        cart.totalPrice = totalPrice;
        
        await cart.save();

        return res.status(200).json({
            message: "Cart item quantity updated successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


// Remove cart item (send productId)
router.get('/remove-cart-item/:id', isLoggedIn, async(req, res)=>{

    try {
        const {id} = req.params;
        const userId = req.user._id;

        // check if product exists
        const product = await productModel.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        // check if user has a cart
        const cart = await cartModel.findOne({userId});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        // check if product is in cart
        const existingProduct = cart.products.find(p=>p.productId.toString() === id);
        if(!existingProduct){
            return res.status(404).json({message: "Product not in cart"});
        }

        // remove product from cart
        cart.products = cart.products.filter(p=>p.productId.toString() !== id);
        cart.totalPrice -= product.price * existingProduct.quantity;
        await cart.save();

        return res.status(200).json({
            message: "Product removed from cart successfully",
            cart
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


module.exports = router;

