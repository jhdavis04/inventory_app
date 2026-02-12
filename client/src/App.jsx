import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // 1. Fetch data from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5001/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err.message);
    }
  };

  // 2. Add a new category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/categories", { name: newCategory });
      setNewCategory(""); // Clear the input
      fetchCategories(); // Refresh the list
    } catch (err) {
      console.error(err.message);
    }
  };

  // Run fetch on page load
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Inventory Manager</h1>
      
      {/* Form to add categories */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="New Category Name" 
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>

      {/* List of categories from Postgres */}
      <h3>Current Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;