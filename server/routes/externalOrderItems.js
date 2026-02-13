const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:orderId', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ExternalOrderItems WHERE order_id = $1', [req.params.orderId]);
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

router.post('/', async (req, res) => {
    try {
        const { order_id, source, external_line_item_id, product_id, quantity, unit_price } = req.body;
        const result = await pool.query(
            'INSERT INTO ExternalOrderItems (order_id, source, external_line_item_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [order_id, source, external_line_item_id, product_id, quantity, unit_price]
        );
        res.json(result.rows[0]);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;