/**
 * server/middleware/authMiddleware.js
 *
 * This Express middleware is used to protect admin-only routes.
 * It checks for a JSON Web Token (JWT) in the 'x-auth-token' header,
 * verifies it, and if valid, attaches the decoded user information to the
 * request object. It specifically checks if the user is 'shopadmin'.
 */
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Add user from payload to request object
    // In this simple case, we might just care that it's an authenticated admin,
    // so req.user might contain { id: adminUserId, username: 'shopadmin' }
    // We can add more role checks if needed later.
    if (!req.user || req.user.username !== 'shopadmin') {
        return res.status(401).json({ msg: 'Token is not valid for admin access' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
