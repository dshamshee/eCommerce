const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const mongoose = require("mongoose");
const Order = require("../model/order");
const Payment = require("../model/payment");
const router = express.Router();

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
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
          }); // for development mode
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
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000,
          }); // for development mode
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

module.exports = router;
