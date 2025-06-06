const express = require("express");
const router = express.Router();
const productModel = require("../model/product");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer_config");
// const user = require("../model/user");

router.post("/add-product", isLoggedIn, upload.single("image"), async(req, res)=>{

    try {
        const {name, description, price, category, genderType, sizes, stock, discount, colors, isNew, isBestSeller} = req.body;
        if(req.user.role !== "admin") return res.status(403).json({message: "You are not authorized to add a product"});
        const product = await productModel.create({
            name,
            description,
            price,
            category,
            genderType,
            sizes,
            image: req.file.filename,
            stock,
            discount,
            colors,
            isNewProduct:isNew, // backend me isNew ek keyword product model me isNewProduct name rakhe hai 
            isBestSeller
        })
        return res.status(201).json({
            message: "Product added successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    
})

router.get('/get-products', async(req, res)=>{
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

router.get('/get-product/:id', async (req, res)=>{
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

router.post('/update-product/:id', isLoggedIn, async(req, res)=>{
    
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

router.get('/get-product-by-type/:type', async(req, res)=>{

    try {
        // check which one is on params category or genderType
        const type = req.params.type;
        let products;
        if(type === "T-shirt" || type === "Jeans" || type === "Shirt" || type === "Shorts"){
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
