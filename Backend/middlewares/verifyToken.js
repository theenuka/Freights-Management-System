const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authheader) {
    const token = authheader.split("")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
const verifyTokenAuthoriztion = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.role == "admin") {
      next();
    } else {
      res.status(403).json("You are not permitted to do this operation");
    }
  });
};

module.exports = { verifytoken, verifyTokenAuthorization };
