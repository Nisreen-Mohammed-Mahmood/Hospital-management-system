const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (auth check)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user details to the request
      req.user = await User.findById(decoded.userId).select("-password");
      req.userType = decoded.type; // Add user type from the decoded token

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to allow access based on user type
const authorizeRoles = (...types) => {
  return (req, res, next) => {
    console.log(req.userType,types,"here")
    if (!types.includes(req.userType)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You don't have access to this resource" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
