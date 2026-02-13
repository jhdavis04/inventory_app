const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT b.*, p.name as product_name FROM Batches b JOIN Products p ON b.product_id = p.id');
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;