import React, { useState } from 'react';
import axios from 'axios';

export default function BatchIngredientForm({ batches, lots, onRefresh }) {
  const [usage, setUsage] = useState({ batch_id: "", ingredient_lot_id: "", qty_used: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/batch-ingredients', usage);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <select onChange={e => setUsage({...usage, batch_id: e.target.value})}>
        <option value="">Select Batch</option>
        {batches.map(b => <option key={b.id} value={b.id}>Batch #{b.id}</option>)}
      </select>
      <select onChange={e => setUsage({...usage, ingredient_lot_id: e.target.value})}>
        <option value="">Select Ingredient Lot</option>
        {lots.map(l => <option key={l.id} value={l.id}>Lot #{l.id}</option>)}
      </select>
      <input type="number" placeholder="Qty Used" onChange={e => setUsage({...usage, qty_used: e.target.value})} />
      <button type="submit">Link Usage</button>
    </form>
  );
}