"use client";
import { useState, useEffect } from "react";
import styles from "./viewers.module.css";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  supplier: string;
  quantity: number;
  price: number;
}

export default function ViewersPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "viewer") {
      window.location.href = "/login";
      return;
    }

    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
    ]).then(async ([invRes, ordRes]) => {
      setItems(await invRes.json());
      setOrders(await ordRes.json());
      setLoading(false);
    });
  }, []);

  // --- REPORT CALCULATIONS ---
  const totalStockValue = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const lowStockCount = items.filter(i => i.quantity < 5).length;

  // --- FILTER LOGIC ---
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className={styles.loading}>Loading Viewer Dashboard...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>System Overview & Reports</h1>

      {/* --- REPORTS SECTION --- */}
      <div className={styles.reportsGrid}>
        <div className={styles.reportCard}>
          <span className={styles.icon}>💰</span>
          <div>
            <h4>Total Stock Value</h4>
            <p className={styles.statNumber}>Rs. {totalStockValue.toLocaleString()}</p>
          </div>
        </div>
        
        <div className={styles.reportCard}>
          <span className={styles.icon}>📈</span>
          <div>
            <h4>Total Sales Revenue</h4>
            <p className={styles.statNumber}>Rs. {totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className={styles.reportCard}>
          <span className={styles.icon}>⚠️</span>
          <div>
            <h4>Critical Low Stock</h4>
            <p className={styles.statNumber}>{lowStockCount} Items</p>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      {/* --- SEARCHBAR --- */}
      <div className={styles.searchBox}>
        <input 
          type="text" 
          placeholder="Search inventory reports..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* --- INVENTORY TABLE --- */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Stock</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td><span className={styles.tag}>{item.category}</span></td>
                <td>{item.supplier || "N/A"}</td>
                <td className={item.quantity < 5 ? styles.dangerText : ""}>
                    {item.quantity}
                </td>
                <td>Rs. {item.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}