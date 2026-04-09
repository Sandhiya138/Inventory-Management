"use client";
import { useState, useEffect } from "react";
import styles from "./inventory.module.css";

export default function InventoryPage() {
  // 1. STATE: Start with some data or load from localStorage
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", category: "Electronics", quantity: 10, price: 999 },
    { id: 2, name: "Office Chair", category: "Furniture", quantity: 4, price: 150 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", category: "", quantity: 0, price: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);

  // 2. CREATE: Add a new item
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name) return;
    
    const itemToAdd = { ...newItem, id: Date.now() };
    setProducts([...products, itemToAdd]);
    setNewItem({ name: "", category: "", quantity: 0, price: 0 }); // Reset form
  };

  // 3. DELETE: Remove an item
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  // 4. UPDATE: Save edits
  const handleEditChange = (id: number, field: string, value: any) => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inventory Management</h1>

      {/* ADD ITEM FORM */}
      <form className={styles.addForm} onSubmit={handleAddItem}>
        <input type="text" placeholder="Product Name" value={newItem.name} 
          onChange={(e) => setNewItem({...newItem, name: e.target.value})} required />
        <input type="text" placeholder="Category" value={newItem.category} 
          onChange={(e) => setNewItem({...newItem, category: e.target.value})} />
        <input type="number" placeholder="Qty" value={newItem.quantity} 
          onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})} />
        <input type="number" placeholder="Price" value={newItem.price} 
          onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})} />
        <button type="submit" className={styles.addBtn}>Add Product</button>
      </form>

      {/* INVENTORY TABLE */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>
                {editingId === item.id ? 
                  <input value={item.name} onChange={(e) => handleEditChange(item.id, "name", e.target.value)} /> 
                  : item.name}
              </td>
              <td>{item.category}</td>
              <td>
                <span style={{ color: item.quantity < 5 ? "red" : "inherit", fontWeight: item.quantity < 5 ? "bold" : "normal" }}>
                  {item.quantity}
                </span>
              </td>
              <td>Rs.{item.price}</td>
              <td>
                {editingId === item.id ? (
                  <button onClick={() => setEditingId(null)} className={styles.saveBtn}>Save</button>
                ) : (
                  <button onClick={() => setEditingId(item.id)} className={styles.editBtn}>Edit</button>
                )}
                <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}