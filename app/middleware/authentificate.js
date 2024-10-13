/**
 * Middleware function to verify JWT token in Authorization header
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {function} next - Express next middleware function
 */
const verification_token = (req, res, next) => {
  // Check if Authorization header is present
  if (!req.headers.authorization) {
    return res.status(403).json({ auth: false, message: "No token provided." });
  }

  // Extract token from Authorization header
  const token = req.headers.authorization;

  // Check if token is present
  if (!token) {
    return res.status(403).json({ auth: false, message: "No token provided." });
  }

  // Verify token using secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    // Check if token is valid
    if (err) {
      return res.status(401).json({ auth: false, message: "Invalid token." });
    }

    // If token is valid, call next middleware function
    next();
  });
};

module.exports = verification_token;
