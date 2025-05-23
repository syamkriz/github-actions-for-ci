/**
 * server/scripts/createAdmin.js
 *
 * This script is used to create or update the default administrator account ('shopadmin')
 * in the 'users' table of the database. It hashes a default password and inserts
 * the admin user if it doesn't exist, or updates the password if it does.
 * It should be run manually during setup.
 */
const bcrypt = require('bcryptjs');
const { Pool } = require('pg'); // Use direct Pool for script
require('dotenv').config({ path: '../.env' }); // Point to .env in parent server directory

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const adminUsername = 'shopadmin';
const adminPassword = 'password123'; // Default password, user should change this

async function createAdmin() {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Check if admin already exists
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [adminUsername]);

    if (rows.length > 0) {
      // Update existing admin's password
      await pool.query('UPDATE users SET password_hash = $1 WHERE username = $2', [hashedPassword, adminUsername]);
      console.log(`Admin user '${adminUsername}' already exists. Password updated.`);
    } else {
      // Insert new admin
      await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [adminUsername, hashedPassword]);
      console.log(`Admin user '${adminUsername}' created successfully with default password.`);
    }
    console.log(`Username: ${adminUsername}`);
    console.log(`Password: ${adminPassword} (REMEMBER TO CHANGE THIS IN A REAL ENVIRONMENT IF SET MANUALLY)`);

  } catch (err) {
    console.error('Error creating/updating admin user:', err.message);
  } finally {
    await pool.end();
  }
}

createAdmin();
