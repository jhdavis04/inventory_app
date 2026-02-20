const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));
app.use('/api/external-orders', require('./routes/externalOrders'));
app.use('/api/external-order-items', require('./routes/externalOrderItems'));
app.use('/api/product-mappings', require('./routes/productMappings'));
app.use('/api/batches', require('./routes/batches'));
app.use('/api/ingredients', require('./routes/ingredients'));
app.use('/api/recipe-items', require('./routes/recipeItems'));
app.use('/api/ingredient-lots', require('./routes/ingredientLots'));
app.use('/api/batch-ingredients', require('./routes/batchIngredients'));

app.get("/", (req, res) => {
  const htmlContent = `
    <h1>Server is connected and running</h1>
    <h2>Directory:</h2>
    <p>/api/categories</p>
    <p>/api/products</p>
    <p>/api/external-orders</p>
    <p>/api/external-order-items</p>
    <p>/api/product-mappings</p>
    <p>/api/batches</p>
    <p>/api/ingredients</p>
    <p>/api/recipe-items</p>
    <p>/api/ingredient-lots</p>
    <p>/api/batch-ingredients</p> `;
    res.send(htmlContent);
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});