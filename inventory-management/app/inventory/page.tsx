
"use client";
import { useState, useEffect } from "react";
import styles from "./inventory.module.css";

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 0,
    price: 0,
    category: "Electronics",
    expiryDate: "",
    supplier: "" 
  });

  const [editId, setEditId] = useState<string | null>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/usersinventory`)
      .then(res => res.json())
      .then(data => setItems(data));

    const userRole = localStorage.getItem("role");
    if (userRole !== "admin" && userRole !== "staff") {
      alert("Access Denied ❌");
      window.location.href = "/login";
    }
    setRole(userRole || "");
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newItem, id: Date.now().toString() }),
    });

    if (res.ok) {
      const saved = await res.json();
      setItems([...items, saved]);
      resetForm();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`, {
        method: "DELETE",
      });
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setNewItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    setItems(items.map(item => item.id === editId ? newItem : item));
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
    setNewItem({ 
      name: "", 
      quantity: 0, 
      price: 0, 
      category: "Electronics", 
      expiryDate: "", 
      supplier: "" 
    });
  };


const filteredItems = items.filter((item) => {
  const matchesSearch = 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.supplier?.toLowerCase().includes(searchTerm.toLowerCase());

  const status = item.quantity < 5 ? "Low Stock" : "In Stock";
  const matchesStatus = filterStatus === "All" || status === filterStatus;

  return matchesSearch && matchesStatus;
});
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inventory Management</h1>

      <div className={styles.formCard}>
        <h3>{editId ? "📝 Update Product" : "➕ Add New Product"}</h3>
        <form onSubmit={editId ? (e) => e.preventDefault() : handleAddProduct} className={styles.addForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Supplier Name" // 🔥 New Supplier Input
            value={newItem.supplier}
            onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
            required
          />

          <select 
            value={newItem.category} 
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className={styles.selectInput}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Furniture">Furniture</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
            required
          />

          <input
            type="date"
            value={newItem.expiryDate || ""}
            onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
          />

          {editId ? (
            <div className={styles.buttonGroup}>
              <button type="button" onClick={handleUpdate} className={styles.updateBtn}>Save Changes</button>
              <button type="button" onClick={() => {setEditId(null); resetForm();}} className={styles.cancelBtn}>Cancel</button>
            </div>
          ) : (
            <button type="submit" className={styles.addBtn}>Add to Stock</button>
          )}
        </form>
      </div>
      <div className={styles.filterContainer}>
  <input
    type="text"
    placeholder="Search by name, category, or supplier..."
    className={styles.searchInput}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  
  <select 
    className={styles.filterSelect}
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option value="All">All Status</option>
    <option value="In Stock">In Stock</option>
    <option value="Low Stock">Low Stock</option>
  </select>
</div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Supplier</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredItems.map(item => (
    <tr key={item.id}>
      <td className={styles.nameCell}>{item.name}</td>
      <td style={{ color: '#94a3b8' }}>{item.supplier || "N/A"}</td>
      <td><span className={styles.categoryTag}>{item.category}</span></td>
      <td>{item.quantity}</td>
      <td>Rs. {item.price.toLocaleString()}</td>
      <td>{formatDate(item.expiryDate)}</td>
      <td>
        <span className={item.quantity < 5 ? styles.lowStock : styles.inStock}>
          {item.quantity < 5 ? "Low Stock" : "Available"}
        </span>
      </td>
      <td>
        <button className={styles.editBtn} onClick={() => handleEdit(item)}>Edit</button>
        {role === "admin" && (
          <button 
            className={styles.deleteBtn} 
            onClick={() => handleDelete(item.id, item.name)}
          >
            Delete
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
      {/* --- SEARCH & FILTER BAR --- */}



    </div>
  );
}