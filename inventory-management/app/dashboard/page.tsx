"use client";
import Link from "next/link";
import { useEffect, useState } from "react";   
import styles from "./dashboard.module.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalValue: 0,
    lowStockCount: 0,
    totalItems: 0
  });
   const [role, setRole] = useState<string | null>(null);
   useEffect(() => {
  const storedRole = localStorage.getItem("role");
  setRole(storedRole);
}, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/inventory");
        const data = await res.json();
        
        const totalVal = data.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
        const lowStock = data.filter((item: any) => item.quantity < 5).length;
       

        setStats({
          totalValue: totalVal,
          lowStockCount: lowStock,
          totalItems: data.length
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    loadStats();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
        {role === "admin" && "👑 Admin Control Panel"}
        {role === "staff" && "🧑‍💼 Staff Dashboard"}
      </h1>
        <p style={{ color:"ffffff" ,fontFamily:"emoji",fontSize:"20px"}}>Welcome back! Here is an overview of your system.</p>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
         <div style={{ background: '#e0f2fe', padding: '15px', borderRadius: '8px', flex: 1, color: '#0369a1' }}>
            <strong>Total Value:</strong> Rs. {stats.totalValue.toLocaleString()}
         </div>
         <div style={{ background: '#fef2f2', padding: '15px', borderRadius: '8px', flex: 1, color: '#b91c1c' }}>
            <strong>Low Stock:</strong> {stats.lowStockCount} Items
         </div>
      </div>

      <div className={styles.grid}>
        <Link href="/inventory" className={styles.card}>
          <div className={styles.icon}>📦</div>
          <h3>Stock Levels</h3>
          <p>Managing {stats.totalItems} products.</p>
        </Link>

        <Link href="/orders" className={styles.card}>
          <div className={styles.icon}>📝</div>
          <h3>Order Tracking</h3>
          <p>Monitor sales and purchase orders.</p>
        </Link>

        <Link href="/reports" className={styles.card}>
          <div className={styles.icon}>📊</div>
          <h3>Analytics</h3>
          <p>View sales trends.</p>
        </Link>

   

{role === "admin" && (
  <Link href="/users" className={styles.card}>
    <div className={styles.icon}>👥</div>
    <h3>Team Management</h3>
    <p>Assign roles and manage user accounts.</p>
  </Link>
)}
        </div>
    </div>
  );
}

export default AdminDashboard;