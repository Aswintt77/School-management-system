const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).send('Not authorized, token failed');
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).send('Not authorized as an Admin');
  }
  next();
};

module.exports = { protect, adminOnly };
