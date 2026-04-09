"use client";
import { useEffect, useState } from "react";
import styles from "./reports.module.css";

export default function Reports() {
  const [stats, setStats] = useState([
    { label: "Total Inventory Value", value: "Rs. 0", trend: "Live", color: "#2563eb" },
    { label: "Stock Items", value: "0", trend: "Items", color: "#10b981" },
    { label: "Active Users", value: "0", trend: "Accounts", color: "#f59e0b" },
  ]);

  useEffect(() => {
    // Calculate real data from LocalStorage
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const totalValue = inventory.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    const totalItems = inventory.length;

    setStats([
      { label: "Total Inventory Value", value: `Rs. ${totalValue.toLocaleString()}`, trend: "Live", color: "#2563eb" },
      { label: "Stock Categories", value: totalItems.toString(), trend: "Categories", color: "#10b981" },
      { label: "Total Staff/Users", value: users.length.toString(), trend: "Active", color: "#f59e0b" },
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <h1 style={{ color: "#1e293b" }}>Business Analytics</h1>
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard} style={{ borderTop: `4px solid ${stat.color}` }}>
            <p className={styles.label}>{stat.label}</p>
            <h2 className={styles.value} style={{ color: "#1e293b" }}>{stat.value}</h2>
            <span className={styles.trend}>{stat.trend}</span>
          </div>
        ))}
      </div>

      <div className={styles.reportDetailCard}>
        <h3>Quick Summary</h3>
        <p>The system is currently tracking <strong>{stats[1].value}</strong> product lines. Total capital locked in inventory is <strong>{stats[0].value}</strong>.</p>
      </div>
    </div>
  );
}