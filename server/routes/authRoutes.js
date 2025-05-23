/**
 * server/routes/authRoutes.js
 *
 * Defines the Express routes for administrator authentication.
 * Currently, it includes a login endpoint (`/api/auth/login`) that validates
 * admin credentials, and if successful, returns a JSON Web Token (JWT).
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
require('dotenv').config();

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists (expecting 'shopadmin')
    if (username !== 'shopadmin') {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ msg: 'Admin user not found. Please run admin creation script.' });
    }

    const user = rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // User matched, create JWT payload
    const payload = {
      user: {
        id: user.id,
        username: user.username
        // Add other admin-specific details if necessary
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Token expiration (e.g., 5 hours)
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
