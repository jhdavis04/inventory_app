const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:batchId', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM BatchIngredients WHERE batch_id = $1', [req.params.batchId]);
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;