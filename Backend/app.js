const express = require("express");
const db = require("./config/db_connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const deliveryAddressRoutes = require("./routes/deliveryAddress");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const { updateExpiredNewProducts } = require("./utils/productUtils");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin: 'http://localhost:5173',
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
