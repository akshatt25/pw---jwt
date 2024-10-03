const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path if necessary
const User = require('../models/user'); // Adjust the path if necessary
const router = express.Router();

// Protected route to get user info
router.get('/getUser', authMiddleware, async (req, res) => {
    try {
        // Find the user by ID from the decoded token
        const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
