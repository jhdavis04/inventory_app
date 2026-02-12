const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json()); // Allows us to handle JSON data

// 2. ROUTES
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// CREATE: Add a new category
app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await pool.query(
      "INSERT INTO Categories (name) VALUES($1) RETURNING *",
      [name]
    );

    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// READ: Get all categories
app.get("/categories", async (req, res) => {
  try {
    const allCategories = await pool.query("SELECT * FROM Categories ORDER BY id ASC");
    res.json(allCategories.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// READ: Get a specific category by ID
app.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await pool.query("SELECT * FROM Categories WHERE id = $1", [id]);
    
    res.json(category.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE: Remove a category
app.delete("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM Categories WHERE id = $1", [id]);
    res.json("Category was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// 3. SERVER START
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

