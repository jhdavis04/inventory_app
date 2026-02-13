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

// A simple test route to make sure the server responds at http://localhost:5001/
app.get("/", (req, res) => {
  res.send("<h1>Server is Alive!</h1><p>Try /api/categories to see data.</p>");
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});