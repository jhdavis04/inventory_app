import React, { useState } from 'react';
import axios from 'axios';

export default function LotForm({ ingredients, onRefresh }) {
  const [lot, setLot] = useState({ ingredient_id: "", qty_purchased: 0, total_cost: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/ingredient-lots', lot);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <select onChange={e => setLot({...lot, ingredient_id: e.target.value})}>
        <option value="">Purchased Ingredient</option>
        {ingredients.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
      </select>
      <input type="number" placeholder="Qty Purchased" onChange={e => setLot({...lot, qty_purchased: e.target.value})} />
      <input type="number" step="0.01" placeholder="Total Cost" onChange={e => setLot({...lot, total_cost: e.target.value})} />
      <button type="submit">Log Purchase</button>
    </form>
  );
}