// Import necessary packages
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Update the path as needed
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const router = express.Router();

const isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regex for strong password
  return regex.test(password);
};

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again later.',
});

// Backend: login route
router.post('/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  console.log(`Attempting login for user: ${username}`);  // Log username for debugging
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).send('Invalid username or password');
    }

    console.log('Login successful');
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token }); 
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in: ' + error.message });
  }
});

// Apply rate limiting to login route
router.post('/login', loginLimiter,  async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }

      // Return a JSON response on successful login
      res.status(200).json({ message: 'Login successful' }); // Changed to JSON response
    } catch (error) {
      res.status(500).json({ message: 'Error logging in: ' + error.message }); // Send JSON response
    }
});

// Export the router
module.exports = router;
