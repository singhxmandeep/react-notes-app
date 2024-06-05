const jwt = require("jsonwebtoken");
const JWT_SECRET = "mandeepisagood$boy";

// Middleware to fetch user details from JWT token
const fetchUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("auth-token");
  if (!token) {
    // If token is missing, return an error response
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    // Verify the token and extract user data
    const data = jwt.verify(token, JWT_SECRET); // Fixed typo here
    req.user = data.user; // Attach user data to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token verification fails, return an error response
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
