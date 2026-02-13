const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ProductMappings');
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

router.post('/', async (req, res) => {
    try {
        const { source, external_sku_or_product_id, product_id } = req.body;
        const result = await pool.query(
            'INSERT INTO ProductMappings (source, external_sku_or_product_id, product_id) VALUES ($1, $2, $3) RETURNING *',
            [source, external_sku_or_product_id, product_id]
        );
        res.json(result.rows[0]);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;