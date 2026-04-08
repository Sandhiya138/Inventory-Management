"use client";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Admin Control Center</h1>
        <p>Welcome back! Here is an overview of your system.</p>
      </header>

      <div className={styles.grid}>
        {/* Inventory Card */}
        <Link href="/inventory" className={styles.card}>
          <div className={styles.icon}>📦</div>
          <h3>Stock Levels</h3>
          <p>Manage products and update quantities.</p>
        </Link>

        {/* Orders Card */}
        <Link href="/orders" className={styles.card}>
          <div className={styles.icon}>📝</div>
          <h3>Order Tracking</h3>
          <p>Monitor sales and purchase orders.</p>
        </Link>

        {/* Reports Card */}
        <Link href="/reports" className={styles.card}>
          <div className={styles.icon}>📊</div>
          <h3>Analytics</h3>
          <p>View sales trends and inventory reports.</p>
        </Link>

        {/* Users Card */}
        <Link href="/users" className={styles.card}>
          <div className={styles.icon}>👥</div>
          <h3>Team Management</h3>
          <p>Assign roles and manage user accounts.</p>
        </Link>
      </div>

      {/* Alerts Section (Embedded in Dashboard) */}
      <section className={styles.alertsSection}>
        <h3>⚠️ System Notifications</h3>
        <div className={styles.alertItem}>Low Stock: iPhone 15 Pro (2 units remaining)</div>
        <div className={styles.alertItem}>Pending Order: #ORD-992 requires approval.</div>
      </section>
    </div>
  );
}