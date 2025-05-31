const express = require("express");
const db = require("./config/db_connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/user', userRoutes);
app.use('/product', productRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
