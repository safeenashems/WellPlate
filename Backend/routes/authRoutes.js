const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema");

const router = express.Router();

// ✅ User Registration (Sign Up)
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("mobile")
      .isMobilePhone().withMessage("Valid mobile number is required"),
    body("password")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, mobile, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ mobile });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create User
      user = new User({
        name,
        mobile,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
);

// ✅ User Login (Sign In)
router.post(
  "/login",
  [
    body("mobile").isMobilePhone().withMessage("Valid mobile number is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { mobile, password } = req.body;

      // Check if user exists
      let user = await User.findOne({ mobile });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          mobile: user.mobile,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
);

module.exports = router;
