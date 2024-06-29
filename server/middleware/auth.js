const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

const authorize = (roles) => {
    return async (req, res, next) => {
        const user = await User.findById(req.user._id);
        if (!roles.includes(user.role)) {
            return res.status(403).send('You do not have permission to perform this action');
        }
        next();
    };
};

module.exports = { authenticate, authorize };
