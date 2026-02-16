import React, { useState } from 'react';
import axios from 'axios';

export default function RecipeForm({ products, ingredients, onRefresh }) {
  const [recipe, setRecipe] = useState({ product_id: "", ingredient_id: "", qty_required: 0, unit: "g" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/recipe-items', recipe);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <select onChange={e => setRecipe({...recipe, product_id: e.target.value})}>
        <option value="">Select Product</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select onChange={e => setRecipe({...recipe, ingredient_id: e.target.value})}>
        <option value="">Select Ingredient</option>
        {ingredients.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
      </select>
      <input type="number" placeholder="Qty Needed" onChange={e => setRecipe({...recipe, qty_required: e.target.value})} />
      <button type="submit">Set Recipe</button>
    </form>
  );
}