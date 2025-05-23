/**
 * server/server.js
 *
 * Main entry point for the backend Express server.
 * Sets up middleware (CORS, JSON parsing), defines API routes,
 * and starts listening on the configured port.
 */
require('dotenv').config(); // For loading environment variables from .env file
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Placeholder for API routes (to be expanded later)
const productRoutes = require('./routes/productRoutes'); // Add this
app.use('/api/products', productRoutes); // Add this
const authRoutes = require('./routes/authRoutes'); // Add this
app.use('/api/auth', authRoutes); // Add this

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
