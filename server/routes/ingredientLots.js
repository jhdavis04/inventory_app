const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM IngredientLots');
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

router.post('/', async (req, res) => {
    try {
        const { ingredient_id, purchased_at, qty_purchased, unit, total_cost } = req.body;
        const result = await pool.query(
            'INSERT INTO IngredientLots (ingredient_id, purchased_at, qty_purchased, unit, total_cost) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [ingredient_id, purchased_at, qty_purchased, unit, total_cost]
        );
        res.json(result.rows[0]);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;