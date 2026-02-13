const express = require('express');
const router = express.Router();
const pool = require('../db');

// get
router.get("/", async (req, res) => {
  try {
    const products = await pool.query(`
      SELECT p.*, c.name AS category_name 
      FROM Products p 
      LEFT JOIN Categories c ON p.category_id = c.id
    `);
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// posting
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const newProduct = await pool.query(
        "INSERT INTO Products (name, description, price, category_id) VALUES($1, $2, $3, $4) RETURNING *",
        [name, description, price, category_id]);
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;