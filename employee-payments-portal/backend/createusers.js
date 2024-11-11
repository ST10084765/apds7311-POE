// Import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import User model
const User = require('./models/User'); // Adjust the path as needed

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to create pre-registered users
async function createUsers() {
  try {
    // Define an array of pre-registered users
    const users = [
      { fullName: 'Aphiwe', username: 'OKK11', accountNumber: '1234567890', idNumber: '1234567890123', password: 'Okkokk@11', role: 'employee' },
      { fullName: 'Bob Smith', username: 'bobsmith', accountNumber: '2345678901', idNumber: '2345678901234', password: 'Password@123', role: 'customer' },
      { fullName: 'Charlie Brown', username: 'charlieb', accountNumber: '3456789012', idNumber: '3456789012345', password: 'Password@123', role: 'employee' }
    ];

    // Loop through each user, hash the password, and save to MongoDB
    for (const user of users) {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Create and save the new user record
      const newUser = new User({
        fullName: user.fullName,
        username: user.username,
        accountNumber: user.accountNumber,
        idNumber: user.idNumber,
        password: hashedPassword,
        role: user.role
      });

      await newUser.save();
      console.log(`User ${user.username} created successfully`);
    }

    console.log('All users created successfully');
    mongoose.disconnect(); // Close the connection after users are created
  } catch (error) {
    console.error('Error creating users:', error);
  }
}

// Run the function to create users
createUsers();
