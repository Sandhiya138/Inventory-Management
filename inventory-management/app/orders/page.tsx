"use client";
import { useState } from "react";
import styles from "./orders.module.css";

// Initial Mock Data
const initialOrders = [
  { id: "ORD-101", customer: "Tech Corp", date: "2026-04-05", total: 1200, status: "Delivered" },
  { id: "ORD-102", customer: "Retail Hub", date: "2026-04-08", total: 450, status: "Pending" },
  { id: "ORD-103", customer: "Global Ltd", date: "2026-04-09", total: 890, status: "Shipped" },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pending": return styles.pending;
      case "Shipped": return styles.shipped;
      case "Delivered": return styles.delivered;
      default: return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Order Management</h1>
        <button className={styles.addBtn}>+ Create New Order</button>
      </div>

      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer/Supplier</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={{ fontWeight: "600" }}>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", marginRight: "10px" }}>View</button>
                <button style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}