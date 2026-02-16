import React, { useState } from 'react';
import axios from 'axios';

export default function OrderItemForm({ orders, products, onRefresh }) {
  const [item, setItem] = useState({ order_id: "", product_id: "", quantity: 1, unit_price: 0 });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/external-order-items', item);
    onRefresh();
  };
  return (
    <form onSubmit={handleSubmit}>
      <select onChange={e => setItem({...item, order_id: e.target.value})}>
        <option value="">Select Order</option>
        {orders.map(o => <option key={o.id} value={o.id}>{o.source} #{o.external_order_id}</option>)}
      </select>
      <select onChange={e => setItem({...item, product_id: e.target.value})}>
        <option value="">Select Product</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input type="number" placeholder="Qty" onChange={e => setItem({...item, quantity: e.target.value})} />
      <button type="submit">Add to Order</button>
    </form>
  );
}