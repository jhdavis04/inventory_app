import React, { useState } from 'react';
import axios from 'axios';

export default function BatchForm({ products, onRefresh }) {
  const [batch, setBatch] = useState({ product_id: "", qty_made: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/batches', batch);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <select onChange={e => setBatch({...batch, product_id: e.target.value})}>
        <option value="">Product Manufactured</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input type="number" placeholder="Qty Made" onChange={e => setBatch({...batch, qty_made: e.target.value})} />
      <button type="submit">Record Batch</button>
    </form>
  );
}