import React, { useState } from 'react';
import axios from 'axios';

export default function ProductForm({ categories, onRefresh }) {
  const [data, setData] = useState({ name: "", description: "", price: "", category_id: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/products', data);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} required />
      <select onChange={e => setData({...data, category_id: e.target.value})} required>
        <option value="">Select Category</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input type="number" step="0.01" placeholder="Price" onChange={e => setData({...data, price: e.target.value})} required />
      <button type="submit">Create Product</button>
    </form>
  );
}