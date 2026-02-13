const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ExternalOrders ORDER BY ordered_at DESC');
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

router.post('/', async (req, res) => {
    try {
        const { source, external_order_id, ordered_at, last_synced_at } = req.body;
        const result = await pool.query(
            'INSERT INTO ExternalOrders (source, external_order_id, ordered_at, last_synced_at) VALUES ($1, $2, $3, $4) RETURNING *',
            [source, external_order_id, ordered_at, last_synced_at]
        );
        res.json(result.rows[0]);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;