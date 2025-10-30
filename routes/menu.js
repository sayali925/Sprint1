const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// @route   GET api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM menu_items');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/menu/:id
// @desc    Get menu item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [rows] = await pool.query('SELECT * FROM menu_items WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/menu/category/:category
// @desc    Get menu items by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const [rows] = await pool.query('SELECT * FROM menu_items WHERE category = ?', [category]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;