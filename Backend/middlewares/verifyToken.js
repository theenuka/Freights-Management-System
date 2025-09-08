const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// Verify JWT Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token; // Expecting: "Bearer <token>"
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = user; // decoded JWT payload
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};

// Verify Admin Authorization
const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("You are not permitted to do this operation");
    }
  });
};

module.exports = { verifyToken, verifyTokenAuthorization };
