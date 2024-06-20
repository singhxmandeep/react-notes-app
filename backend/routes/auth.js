const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");

const router = express.Router();
const JWT_SECRET = "mandeepisagood$boy"; // Secret key for JWT

// Route 01: Create a User using POST "/api/auth/createUser" - No login required
router.post(
  "/createUser",
  [
    // Validation rules for incoming request body
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are validation errors, return a 400 response with errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check whether a user with the same email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send("Sorry, a user with this email already exists");
      }

      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });

      // Create a payload for JWT
      const data = {
        user: {
          id: user.id
        }
      };

      // Generate a JWT token
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log({ authToken });

      // Send the JWT token as response
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 02: Authenticate a User using POST "/api/auth/login" - No login required
router.post("/login", [
  // Validation rules for incoming request body
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists()
], async (req, res) => {
  // If there are validation errors, return a 400 response with errors
  const errors = validationResult(req);
  let success = false;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    // Check if user with the given email exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    // Compare the given password with the stored hashed password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    // Create a payload for JWT
    const data = {
      user: {
        id: user.id
      }
    };


    // Generate a JWT token
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error" );
  }
});

// Route 03: Get details of the User using POST "/api/auth/getuser" - Login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    // Fetch user details from the database using the user ID from the token
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password"); // Exclude password from response
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
