const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:productId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.*, i.name as ingredient_name 
            FROM RecipeItems r 
            JOIN Ingredients i ON r.ingredient_id = i.id 
            WHERE r.product_id = $1`, [req.params.productId]);
        res.json(result.rows);
    } catch (err) { res.status(500).send(err.message); }
});

module.exports = router;