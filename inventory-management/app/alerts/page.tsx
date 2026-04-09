"use client";
import { useState, useEffect } from "react";
import styles from "./alerts.module.css";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // 1. Get Inventory and Orders from LocalStorage
    const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newAlerts: any[] = [];

    // 2. Logic: Identify Low Stock (Critical < 5, Warning < 10)
    inventory.forEach((item: any) => {
      if (item.quantity <= 2) {
        newAlerts.push({
          id: `inv-${item.id}`,
          type: "CRITICAL",
          message: `Out of Stock / Critical: ${item.name} has only ${item.quantity} left!`,
          action: "Restock Now",
        });
      } else if (item.quantity < 10) {
        newAlerts.push({
          id: `inv-${item.id}`,
          type: "WARNING",
          message: `Low Stock Warning: ${item.name} is running low (${item.quantity} units).`,
          action: "View Item",
        });
      }
    });

    // 3. Logic: Identify Pending Orders
    const pendingCount = orders.filter((o: any) => o.status === "Pending").length;
    if (pendingCount > 0) {
      newAlerts.push({
        id: "ord-pending",
        type: "INFO",
        message: `System Note: There are ${pendingCount} orders awaiting processing.`,
        action: "Process Orders",
      });
    }

    setAlerts(newAlerts);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ color: "#1e293b" }}>Alerts & Notifications</h1>
        <p style={{ color: "#64748b" }}>Real-time system health and stock warnings.</p>
      </header>

      <div className={styles.alertList}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`${styles.alertCard} ${styles[alert.type.toLowerCase()]}`}
            >
              <div className={styles.icon}>
                {alert.type === "CRITICAL" ? "🔴" : alert.type === "WARNING" ? "🟠" : "🔵"}
              </div>
              <div className={styles.content}>
                <span className={styles.typeLabel}>{alert.type}</span>
                <p className={styles.message}>{alert.message}</p>
              </div>
              <button className={styles.actionBtn}>{alert.action}</button>
            </div>
          ))
        ) : (
          <div className={styles.noAlerts}>
            ✅ All systems are clear. No pending alerts.
          </div>
        )}
      </div>
    </div>
  );
}