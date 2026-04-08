"use client";
import styles from "./reports.module.css";

export default function Reports() {
  const stats = [
    { label: "Total Inventory Value", value: "$45,200", trend: "+12%" },
    { label: "Total Orders (Monthly)", value: "128", trend: "+5%" },
    { label: "Top Supplier", value: "TechLogistics", trend: "" },
  ];

  return (
    <div className={styles.container}>
      <h1>Business Analytics</h1>
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <p className={styles.label}>{stat.label}</p>
            <h2 className={styles.value}>{stat.value}</h2>
            <span className={styles.trend}>{stat.trend}</span>
          </div>
        ))}
      </div>
      
      <div className={styles.chartPlaceholder}>
        <p>Stock Movement Trend (Chart Visualization Placeholder)</p>
      </div>
    </div>
  );
}