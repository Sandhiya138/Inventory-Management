"use client";
import { useState, useEffect } from "react";
import styles from "./alerts.module.css";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const generateAlerts = async () => {
    try {
      const [invRes, orderRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`)
      ]);

      const inventory = await invRes.json();
      const orders = await orderRes.json();
      const newAlerts: any[] = [];

      const today = new Date();

      inventory.forEach((item: any) => {
        // 🔴 CRITICAL STOCK
        if (item.quantity <= 2) {
          newAlerts.push({
            id: `inv-crit-${item.id}`,
            type: "CRITICAL",
            message: `URGENT: ${item.name} almost out (${item.quantity})`,
            action: "Restock",
            link: "/inventory"
          });
        }

        // ⚠️ LOW STOCK
        else if (item.quantity < 10) {
          newAlerts.push({
            id: `inv-low-${item.id}`,
            type: "WARNING",
            message: `Low stock: ${item.name} (${item.quantity})`,
            action: "View",
            link: "/inventory"
          });
        }

        // ⏳ EXPIRY ALERT
        if (item.expiryDate) {
          const expiry = new Date(item.expiryDate);
          const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          if (diffDays <= 2) {
            newAlerts.push({
              id: `exp-crit-${item.id}`,
              type: "CRITICAL",
              message: `${item.name} expires in ${diffDays} day(s)!`,
              action: "Check",
              link: "/inventory"
            });
          } else if (diffDays <= 7) {
            newAlerts.push({
              id: `exp-warn-${item.id}`,
              type: "WARNING",
              message: `${item.name} expiring soon (${diffDays} days left)`,
              action: "View",
              link: "/inventory"
            });
          }
        }
      });

      // 📦 PENDING ORDERS
      const pendingOrders = orders.filter((o: any) => o.status === "Pending");

      if (pendingOrders.length > 0) {
        newAlerts.push({
          id: "ord-pending",
          type: "INFO",
          message: `${pendingOrders.length} pending orders`,
          action: "Process",
          link: "/orders"
        });
      }

      setAlerts(newAlerts);
    } catch (err) {
      console.error("Failed alerts:", err);
    } finally {
      setLoading(false);
    }
  };

  generateAlerts();
}, []);

  // Handler for the Action Button
  const handleAction = (link: string) => {
    window.location.href = link;
  };

  if (loading) return <div className={styles.loading}>Scanning system...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>System Notifications</h1>
        <p>Real-time updates on inventory levels and order status.</p>
      </header>

      <div className={styles.alertList}>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`${styles.alertCard} ${styles[alert.type.toLowerCase()]}`}
            >
              <div className={styles.icon}>
                {alert.type === "CRITICAL" ? "❌" : alert.type === "WARNING" ? "⚠️" : "ℹ️"}
              </div>
              <div className={styles.content}>
                <span className={styles.typeLabel}>{alert.type}</span>
                <p className={styles.message}>{alert.message}</p>
              </div>
              <button 
                className={styles.actionBtn}
                onClick={() => handleAction(alert.link)}
              >
                {alert.action}
              </button>
            </div>
          ))
        ) : (
          <div className={styles.noAlerts}>
            <div style={{fontSize: "40px", marginBottom: "10px"}}>✅</div>
            <h3>System Healthy</h3>
            <p>No critical stock issues or pending orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}