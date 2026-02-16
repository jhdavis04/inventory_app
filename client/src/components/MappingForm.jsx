import React, { useState } from 'react';
import axios from 'axios';

export default function MappingForm({ products, onRefresh }) {
  const [map, setMap] = useState({ source: "", external_sku_or_product_id: "", product_id: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/product-mappings', map);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Etsy/Shopify SKU" onChange={e => setMap({...map, external_sku_or_product_id: e.target.value})} />
      <select onChange={e => setMap({...map, product_id: e.target.value})}>
        <option value="">Link to internal Product</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <button type="submit">Save Mapping</button>
    </form>
  );
}