// utils/generateToken.js
const jwt = require("jsonwebtoken");

const generateToken = (userId, type) => {
  return jwt.sign({ userId, type }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = generateToken;
