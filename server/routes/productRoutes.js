/**
 * server/routes/productRoutes.js
 *
 * Defines the Express routes for product-related API endpoints.
 * This includes routes for getting all products, getting a single product by ID,
 * creating, updating, and deleting products (admin-only operations).
 * It uses the database connection from `db.js` and authentication middleware.
 */
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming db.js is in the parent directory
const auth = require('../middleware/authMiddleware');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET /api/products/:id - Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /api/products - Create a new product (placeholder - to be admin only)
router.post('/', auth, async (req, res) => {
  // IMPORTANT: Add authentication middleware here later
  try {
    const { name, description, price, image_url, stock } = req.body;
    if (!name || !price) {
        return res.status(400).json({ msg: 'Name and price are required' });
    }
    const newProduct = await db.query(
      'INSERT INTO products (name, description, price, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, image_url, stock]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// PUT /api/products/:id - Update a product (placeholder - to be admin only)
router.put('/:id', auth, async (req, res) => {
  // IMPORTANT: Add authentication middleware here later
  try {
    const { id } = req.params;
    const { name, description, price, image_url, stock } = req.body;
    // Ensure product exists (optional, or let DB handle it)
    const updatedProduct = await db.query(
      'UPDATE products SET name = $1, description = $2, price = $3, image_url = $4, stock = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [name, description, price, image_url, stock, id]
    );
    if (updatedProduct.rows.length === 0) {
      return res.status(404).json({ msg: 'Product not found to update' });
    }
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE /api/products/:id - Delete a product (placeholder - to be admin only)
router.delete('/:id', auth, async (req, res) => {
  // IMPORTANT: Add authentication middleware here later
  try {
    const { id } = req.params;
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (deleteOp.rowCount === 0) {
      return res.status(404).json({ msg: 'Product not found to delete' });
    }
    res.json({ msg: 'Product deleted successfully', product: deleteOp.rows[0] });
  } catch (err)
  {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
