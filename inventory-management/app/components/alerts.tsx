"use client";
import styles from "./alerts.module.css";

export default function Alerts({ inventory }) {
  // Logic to find low stock (e.g., less than 5 items)
  const lowStockItems = inventory.filter(item => item.quantity < 5);

  return (
    <div className={styles.alertBox}>
      <h2 className={styles.alertTitle}>⚠️ System Alerts</h2>
      {lowStockItems.length > 0 ? (
        lowStockItems.map(item => (
          <div key={item.id} className={styles.alertItem}>
            <strong>Low Stock:</strong> {item.name} has only {item.quantity} left!
          </div>
        ))
      ) : (
        <p className={styles.noAlerts}>All stock levels are optimal.</p>
      )}
    </div>
  );
}