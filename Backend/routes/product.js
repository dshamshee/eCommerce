const express = require("express");
const router = express.Router();
const productModel = require("../model/product");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer_config");
const memoryUpload = require("../config/multer_memory.config");
const uploadOnCloudinary = require("../utils/cloudinaryConfig");
const fs = require("fs");

router.post("/add-product", isLoggedIn, async(req, res)=>{
    const {productData} = req.body;
    try 
    {
        if(req.user.role !== "admin") return res.status(403).json({message: "You are not authorized to add a product"});

        const product = await productModel.create({
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price),
            category: productData.category,
            genderType: productData.genderType,
            sizes: productData.sizes,
            stock: parseInt(productData.stock),
            discount: parseFloat(productData.discount) || 0,
            colors: productData.colors,
            isNewProduct: productData.isNew === true || productData.isNew === 'true', 
            isBestSeller: productData.isBestSeller === true || productData.isBestSeller === 'true',
            fabric: productData.fabric,
            care: productData.care,
            features: productData.features
        });
        
        return res.status(201).json({
            message: "Product added successfully",
            product
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({message: error.message});
    }
});

// Product images upload route
router.post('/upload-images/:id', isLoggedIn, memoryUpload.array('images'), async(req , res)=>{
    try {
        const images = req.files;
        const imageUploadedSuccessfully = await images.map(async(image)=>{
            const response = await uploadOnCloudinary(image);
            return response;
        })

        const imageUrls = await Promise.all(imageUploadedSuccessfully);
        
        if(imageUrls.length > 0){
            const productImages = imageUrls.map(async(image)=>{
                await productModel.findOneAndUpdate({_id: req.params.id}, {$push: {images: image}});
            })
            
            // Delete images from local storage after successful Cloudinary upload
            await Promise.all(productImages);
            // const imagePaths = images.map(image => image.path);
            // imagePaths.forEach(imagePath => {
            //     fs.unlinkSync(imagePath);
            // });
        }
            
        return res.status(200).json({
            message: "Images uploaded successfully",
            imageUrls
        })
    } catch (error) {
        return res.status(500).json({message: "Error uploading images on cloudinary"});
    }
})

// get all products
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

// get product by id
router.get('/get-product/:id', async (req, res)=>{
    try {
        const product = await productModel.findOne({_id: req.params.id});
        if(!product) return res.status(404).json({message: "Product not found"});
        return res.status(200).json({
            message: "Product fetched successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

// update product by id
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

// get product by type (category or genderType)
router.get('/get-product-by-type/:type', async(req, res)=>{
    try {
        // check which one is on params category or genderType
        const type = req.params.type;
        let products, unisexProducts;
        if(type === "T-shirt" || type === "Jeans" || type === "Shirt" || type === "Shorts"){
            products = await productModel.find({category: type});
        }else if(type === "Men" || type === "Women"){
            products = await productModel.find({genderType: type});
            unisexProducts = await productModel.find({genderType: "Unisex"});
        }else{
            return res.status(400).json({message: "Invalid type"});
        }
        return res.status(200).json({
            message: "Products fetched successfully",
            allProducts: [...products, ...unisexProducts]
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})


router.get('/delete-product/:id', isLoggedIn, async (req, res)=>{
    try {
        if(req.user.role !== "admin") return res.status(403).json({message: "You are not authorized to delete a product"});
        const product = await productModel.findOneAndDelete({_id: req.params.id});
        if(!product) return res.status(404).json({message: "Product not found"});
        return res.status(200).json({
            message: "Product deleted successfully",
            product
        })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
})

module.exports = router;
