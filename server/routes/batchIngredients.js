const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:batchId', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM BatchIngredients WHERE batch_id = $1', [req.params.batchId]);
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

router.post('/', async (req, res) => {
    try {
        const { batch_id, ingredient_lot_id, qty_used } = req.body;
        const result = await pool.query(
            'INSERT INTO BatchIngredients (batch_id, ingredient_lot_id, qty_used) VALUES ($1, $2, $3) RETURNING *',
            [batch_id, ingredient_lot_id, qty_used]
        );
        res.json(result.rows[0]);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;