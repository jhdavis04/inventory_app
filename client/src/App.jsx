import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import all 10 specialized form components
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';
import OrderForm from './components/OrderForm';
import OrderItemForm from './components/OrderItemForm';
import MappingForm from './components/MappingForm';
import BatchForm from './components/BatchForm';
import IngredientForm from './components/IngredientForm';
import RecipeForm from './components/RecipeForm';
import LotForm from './components/LotForm';
import BatchIngredientForm from './components/BatchIngredientForm';

const API_BASE = "http://localhost:5001/api";

function App() {
  // Navigation State
  const [view, setView] = useState("inventory");

  // Data State for all 10 tables
  const [db, setDb] = useState({
    categories: [], products: [], orders: [], orderItems: [],
    mappings: [], batches: [], ingredients: [], recipes: [],
    lots: [], batchIngredients: []
  });

  // Centralized Fetching Logic - Fires all 10 requests at once
  const refreshData = async () => {
    try {
      const endpoints = [
        'categories', 'products', 'external-orders', 'external-order-items',
        'product-mappings', 'batches', 'ingredients', 'recipe-items',
        'ingredient-lots', 'batch-ingredients'
      ];
      
      const responses = await Promise.all(
        endpoints.map(ep => axios.get(`${API_BASE}/${ep}`))
      );

      setDb({
        categories: responses[0].data,
        products: responses[1].data,
        orders: responses[2].data,
        orderItems: responses[3].data,
        mappings: responses[4].data,
        batches: responses[5].data,
        ingredients: responses[6].data,
        recipes: responses[7].data,
        lots: responses[8].data,
        batchIngredients: responses[9].data
      });
    } catch (err) {
      console.error("Database sync failed:", err.message);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <main className="container-fluid" style={{ padding: 0 }}>
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="top-nav">
        <ul>
          {["inventory", "stock", "history", "stats"].map((t) => (
            <li key={t}>
              <a onClick={() => setView(t)}>
                {view === t ? `> ${t.charAt(0).toUpperCase() + t.slice(1).replace('stock', 'Ingredient Stock').replace('history', 'Sale History').replace('stats', 'Statistics')}` : 
                t.charAt(0).toUpperCase() + t.slice(1).replace('stock', 'Ingredient Stock').replace('history', 'Sale History').replace('stats', 'Statistics')}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="container">
        
        {/* 1. INVENTORY VIEW - Matches Wireframe 3 */}
        {view === "inventory" && (
          <div className="grid">
            <article>
              <header>Item Quantity Category</header>
              <table>
                <tbody>
                  {db.products.map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>-</td> 
                      <td>{db.categories.find(c => c.id === p.category_id)?.name || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <section className="form-sidebar">
              <h3>--Category--</h3>
              <CategoryForm onRefresh={refreshData} />
              <hr />
              <h3>--Product--</h3>
              <ProductForm categories={db.categories} onRefresh={refreshData} />
            </section>
          </div>
        )}

        {/* 2. INGREDIENT STOCK VIEW - Matches Wireframe 4 */}
        {view === "stock" && (
          <div className="grid">
            <article>
              <header>Ingredient Amount Batch</header>
              <table>
                <tbody>
                  {db.ingredients.map(i => (
                    <tr key={i.id}>
                      <td>{i.name}</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <section className="form-sidebar">
              <h3>--Ingredient--</h3>
              <IngredientForm onRefresh={refreshData} />
              <hr />
              <h3>--Purchase Lot--</h3>
              <LotForm ingredients={db.ingredients} onRefresh={refreshData} />
            </section>
          </div>
        )}

        {/* 3. SALE HISTORY VIEW - Matches Wireframe 2 */}
        {view === "history" && (
          <div className="grid">
            <article>
              <header>Name Item Name Quantity Price Date</header>
              <table>
                <tbody>
                  {db.orders.map(o => (
                    <tr key={o.id}>
                      <td>{o.source}</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>{new Date(o.ordered_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
            <section className="form-sidebar">
              <h3>--Log Sale--</h3>
              <OrderForm onRefresh={refreshData} />
              <OrderItemForm orders={db.orders} products={db.products} onRefresh={refreshData} />
            </section>
          </div>
        )}

        {/* 4. STATISTICS VIEW - Matches Wireframe 1 */}
        {view === "stats" && (
          <div className="grid">
            <div>
              <div className="graph-box">INSERT GRAPHS HERE</div>
              <article style={{ marginTop: '1rem', width: '300px', textAlign: 'center' }}>
                ACTUAL NUMBER HERE
              </article>
            </div>
            <section className="form-sidebar">
              <button className="dark-btn">Revenue</button>
              <button className="dark-btn">Spending</button>
              <button className="dark-btn">Profit</button>
              <hr />
              <button className="dark-btn">Monthly</button>
              <button className="dark-btn">Daily</button>
              <button className="dark-btn">Weekly</button>
            </section>
          </div>
        )}

      </div> {/* Closes .container */}
    </main> 
  );
}

export default App;