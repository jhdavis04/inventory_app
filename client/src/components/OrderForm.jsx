import React, { useState } from 'react';
import axios from 'axios';

export default function OrderForm({ onRefresh }) {
  const [order, setOrder] = useState({ source: "", external_order_id: "", ordered_at: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/external-orders', order);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Source (e.g. Shopify)" onChange={e => setOrder({...order, source: e.target.value})} />
      <input placeholder="Order ID" onChange={e => setOrder({...order, external_order_id: e.target.value})} />
      <input type="datetime-local" onChange={e => setOrder({...order, ordered_at: e.target.value})} />
      <button type="submit">Log Order</button>
    </form>
  );
}