const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const https = require('https');
const fs = require('fs');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Load SSL certificate and private key
const privateKey = fs.readFileSync('./server.key', 'utf8'); // Adjusted path
const certificate = fs.readFileSync('./server.cert', 'utf8'); // Adjusted path

const credentials = { key: privateKey, cert: certificate };

// Define comprehensive CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests only from your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Enable cookies or credentials if needed
  preflightContinue: false, // Pass the preflight response to the next handler
  optionsSuccessStatus: 204, // Some legacy browsers (e.g., IE11) choke on 204
};

// Apply security-related middleware
app.use(helmet()); // Protect against well-known vulnerabilities
app.use(cors(corsOptions)); // Apply CORS
app.options('*', cors(corsOptions)); // Handle preflight `OPTIONS` requests

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use your routes
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the server
httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
