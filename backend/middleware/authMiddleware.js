const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // get the authorization header from request
  const token = authHeader && authHeader.split(" ")[1]; // get just only the token part

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // verify token using the secret key
    req.user = decoded; // attach this info to req to use in route later
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

module.exports = authenticateToken;
