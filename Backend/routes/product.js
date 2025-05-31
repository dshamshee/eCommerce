const express = require("express");
const router = express.Router();
const productModel = require("../model/product");
const isLoggedIn = require("../middleware/isLoggedIn");
// const user = require("../model/user");

router.post("/addproduct", isLoggedIn,async(req, res)=>{

    try {
        const {name, description, price, category, genderType, size, image, stock} = req.body;
        if(req.user.role !== "admin") return res.status(403).json({message: "You are not authorized to add a product"});
        const product = await productModel.create({
            name,
            description,
            price,
            category,
            genderType,
            size,
            image,
            stock
        })
        return res.status(201).json({
            message: "Product added successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
})

router.get('/getProducts', async(req, res)=>{
    try {
        const products = await productModel.find();
        return res.status(200).json({
            message: "Products fetched successfully",
            products
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.get('/getProduct/:id', async (req, res)=>{
    try {
        const product = await productModel.find({_id: req.params.id});
        if(!product) return res.status(404).json({message: "Product not found"});
        return res.status(200).json({
            message: "Product fetched successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.post('/updateProduct/:id', isLoggedIn, async(req, res)=>{
    
    try {
        const {name, description, price, category, image, stock} = req.body;
        if(req.user.role !== "admin") return res.status(403).json({message: "You are not authorized to update a product"});
        const product = await productModel.findOneAndUpdate({_id: req.params.id}, {
            name,
            description,
            price,
            category,
            image,
            stock
        })
        return res.status(200).json({
            message: "Product updated successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

router.get('/getProductByType/:type', async(req, res)=>{

    try {
        // check which one is on params category or genderType
        const type = req.params.type;
        let products;
        if(type === "T-shirt" || type === "Jeans"){
            products = await productModel.find({category: type});
        }else if(type === "Men" || type === "Women"){
            products = await productModel.find({genderType: type});
        }else{
            return res.status(400).json({message: "Invalid type"});
        }
        return res.status(200).json({
            message: "Products fetched successfully",
            products
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

module.exports = router;
