const userModel = require("../model/user");
const OrderModel = require("../model/order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const mongoose = require("mongoose");
const Order = require("../model/order");
const Payment = require("../model/payment");
const upload = require("../config/multer_config");
const memoryUpload = require("../config/multer_memory.config");
const uploadOnCloudinary = require("../utils/cloudinaryConfig");
const fs = require("fs");
const router = express.Router();
const nodemailer = require("nodemailer");

// Normal Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (hash) {
          const newUser = await userModel.create({
            name,
            email,
            password: hash,
            phone,
          });

          const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET_KEY
          );
          // res.cookie("token", token, {
          //   httpOnly: true,
          //   secure: true,
          // }); // for development mode
          res.status(201).json({
            message: "User created successfully",
            token: token,
            userName: newUser.name,
            userEmail: newUser.email,
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Generate OTP
router.post('/generate-otp', async (req ,res)=>{
  const {name, email} = req.body;

  try {
    const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'danishshamshee@gmail.com',
        pass:'xbah udob vkvp queq' // gmail app passcode 
      }
    })
    const otp = Math.floor(100000 + Math.random() * 900000);
    const sendedOTP = await transporter.sendMail({
      from:"danishshamshee@gmail.com",
      to:email,
      subject:"Wolvenstitch - OTP Verification",
      html:`Hello ${name} !! Your Otp is ${otp} . Kindly Don't Share it to any One`
    })

    if(sendedOTP){
      res.status(200).json({
        message: "OTP sent successfully",
        otp: otp,
      })
    }else{
      return res.status(400).json({ message: "OTP not sent" });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

// Google login/Signup
router.post("/google-login", async (req, res) => {
  try {
    const { name, email, avatar, googleId } = req.body;

    // check if user already exists
    let user = await userModel.findOne({ $or: [{ email }, { googleId }] });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        googleId,
        avatar,
      });
    } else {
      // update the existing user's google Id if not set
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    }); // for development mode
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Normal login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY
          );
          // res.cookie("token", token, {
          //   httpOnly: true,
          //   secure: true,
          // }); // for development mode
          res.status(200).json({
            message: "User logged in successfully",
            token: token,
            userName: user.name,
            userEmail: user.email,
          });
        } else {
          return res.status(400).json({ message: "Invalid password" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-user", isLoggedIn, async (req, res) => {
  try {
    res.status(200).json({
      message: "User fetched successfully",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/update-user", isLoggedIn, async (req, res) => {
  try {
    // Get the update fields from request body
    const updates = req.body;

    // If password is being updated, hash it first
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }

    // Find and update the user with only the provided fields
    const updatedUser = await userModel
      .findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true, runValidators: true }
      )
      .select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/update-user-profile', isLoggedIn, memoryUpload.single('image'), async (req, res)=>{
  try {
    const image = req.file;
    const imageUploadedUrl = await uploadOnCloudinary(image);
    if(imageUploadedUrl){
      const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {$set: {avatar: imageUploadedUrl}}, {new: true});
      res.status(200).json({
        message: "User profile updated successfully",
        user: updatedUser,
      });
    }else{
      return res.status(400).json({ message: "Image not uploaded on cloudinary" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Image not uploaded from the server", error: error.message });
  }
})

router.get("/delete-User", isLoggedIn, async (req, res) => {
  // Start a new session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Delete all orders associated with the user
    await Order.deleteMany({ userId: req.user._id }).session(session);

    // Delete all payments associated with the user
    await Payment.deleteMany({ userId: req.user._id }).session(session);

    // Finally delete the user
    await userModel.findOneAndDelete({ _id: req.user._id }).session(session);

    // If everything is successful, commit the transaction
    await session.commitTransaction();

    res.status(200).json({
      message: "User and all associated data deleted successfully",
    });
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    return res.status(500).json({ message: error.message });
  } finally {
    // End the session
    session.endSession();
  }
});

router.get("/logout", isLoggedIn, async (req, res) => {
  try {
    res.clearCookie("token"); // for development mode
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


// Get all users
router.get('/get-all-users', isLoggedIn, async(req, res)=>{
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ message: "You are not authorized to access this route" });
    const users = await userModel.find({}).select('-password');
    const orders = await OrderModel.find({userId: {$in: users.map(user => user._id)}});

    res.status(200).json({
      message: "All users fetched successfully",
      users: users,
      orders: orders,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

// Get Graph data for admin dashboard
router.get('/get-graph-data', isLoggedIn, async (req, res)=>{
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ message: "You are not authorized to access this route" });

    // Calculate date 30 days ago from today
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Get all users created in the last 30 days
    const users = await userModel.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).select('-password');

    // Get all orders from the last 30 days
    const orders = await OrderModel.find({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Create daily user count for the last 30 days
    const dailyUserCounts = [];
    const dailyOrderCounts = [];
    const dailyRevenue = [];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      // Count users for this day
      const userCount = await userModel.countDocuments({
        createdAt: { $gte: date, $lt: nextDate }
      });
      
      // Count orders for this day
      const dayOrders = await OrderModel.find({
        createdAt: { $gte: date, $lt: nextDate }
      });
      
      const orderCount = dayOrders.length;
      
      // Calculate revenue for this day
      const dayRevenue = dayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      
      dailyUserCounts.unshift({
        date: date.toISOString().split('T')[0],
        count: userCount
      });
      
      dailyOrderCounts.unshift({
        date: date.toISOString().split('T')[0],
        count: orderCount
      });
      
      dailyRevenue.unshift({
        date: date.toISOString().split('T')[0],
        revenue: dayRevenue
      });
    }

    res.status(200).json({
      message: "Graph data fetched successfully",
      dailyUserCounts: dailyUserCounts,
      dailyOrderCounts: dailyOrderCounts,
      dailyRevenue: dailyRevenue
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
})

// Get total number of users
// router.get('/get-total-users', isLoggedIn, async (req, res)=>{

//   try {
//     if(req.user.role !== 'admin') return res.status(403).json({ message: "You are not authorized to access this route" });
//     const totalUser = await userModel.countDocuments()
//     res.status(200).json({
//       message: "Total users fetched successfully",
//       totalUser: totalUser,
//     })
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// })
module.exports = router;
