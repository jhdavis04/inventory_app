const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:orderId', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ExternalOrderItems WHERE order_id = $1', [req.params.orderId]);
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;