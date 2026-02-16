import React, { useState } from 'react';
import axios from 'axios';

export default function CategoryForm({ onRefresh }) {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/categories', { name });
    setName("");
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>New Category <input value={name} onChange={e => setName(e.target.value)} required /></label>
      <button type="submit">Add Category</button>
    </form>
  );
}