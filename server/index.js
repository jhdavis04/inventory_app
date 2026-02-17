const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/external-orders', require('./routes/externalOrders'));
app.use('/external-order-items', require('./routes/externalOrderItems'));
app.use('/product-mappings', require('./routes/productMappings'));
app.use('/batches', require('./routes/batches'));
app.use('/ingredients', require('./routes/ingredients'));
app.use('/recipe-items', require('./routes/recipeItems'));
app.use('/ingredient-lots', require('./routes/ingredientLots'));
app.use('/batch-ingredients', require('./routes/batchIngredients'));

app.get("/", (req, res) => {
  res.send("<h1>Server is Alive!</h1>");
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});