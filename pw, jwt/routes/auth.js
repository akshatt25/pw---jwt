// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const router = express.Router();

// Replace this with your actual secret key
const JWT_SECRET = 'abcd45';

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password, // The password will be hashed in the User model
        });

        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and sign a JWT
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
