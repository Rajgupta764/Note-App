import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: "Account created successfully" });
  } catch (error) {
    console.error("Error in /register:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, "secretkeyofnoteapp123@3", { expiresIn: "5h" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error in /login:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
