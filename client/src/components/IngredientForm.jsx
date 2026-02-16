import React, { useState } from 'react';
import axios from 'axios';

export default function IngredientForm({ onRefresh }) {
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/ingredients', { name });
    setName("");
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Ingredient Name" value={name} onChange={e => setName(e.target.value)} required />
      <button type="submit">Add Ingredient</button>
    </form>
  );
}