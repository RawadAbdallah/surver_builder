const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).send("Forbidden");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username }).select(
      "-password"
    );
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    // Handle token verification errors
    console.error("Token verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Token has expired");
    }

    return res.status(401).send("Invalid token");
  }
};

module.exports = {
  authMiddleware,
};
