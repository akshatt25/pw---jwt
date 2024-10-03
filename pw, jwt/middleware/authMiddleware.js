const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, "abcd45");
        req.user = decoded; // Add the user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
