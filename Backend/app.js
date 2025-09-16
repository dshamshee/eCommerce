const express = require("express");
const db = require("./config/db_connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const deliveryAddressRoutes = require("./routes/deliveryAddress");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const paymentRoutes = require("./routes/payment");
const { updateExpiredNewProducts } = require("./utils/productUtils");
const cors = require("cors");
const returnOrderRoutes = require("./routes/returnOrder");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Determine environment
const frontend_url = process.env.FRONTENT_ORIGIN_URI
app.use(cors({
        // origin: 'https://e-commerce-blush-iota-63.vercel.app', // for production
        // origin: 'http://localhost:5173', // for development
    origin: frontend_url,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}));

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/delivery-address', deliveryAddressRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/return', returnOrderRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    
    // Run initial check for expired products
    updateExpiredNewProducts()
        .then(count => {
            if (count > 0) {
                console.log(`Updated ${count} expired new products on startup`);
            }
        })
        .catch(err => console.error("Error updating expired products on startup:", err));
    
    // Set up scheduler to run every day at midnight
    const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    setInterval(() => {
        updateExpiredNewProducts()
            .then(count => {
                if (count > 0) {
                    console.log(`Scheduled update: Updated ${count} expired new products`);
                }
            })
            .catch(err => console.error("Error in scheduled update of expired products:", err));
    }, ONE_DAY);
})
