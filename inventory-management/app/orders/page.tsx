"use client";
import { useState } from "react";
import styles from "./orders.module.css";

const initialOrders = [
  { id: "ORD-101", customer: "Tech Corp", date: "2026-04-05", total: 1200, status: "Delivered" },
  { id: "ORD-102", customer: "Retail Hub", date: "2026-04-08", total: 450, status: "Pending" },
];

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- Functions ---
  const handleView = (order: any) => {
    setSelectedOrder(order);
    setIsEditing(false); // View mode
  };

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setIsEditing(true); // Edit mode
  };

  const closeModal = () => setSelectedOrder(null);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    closeModal();
  };

  return (
    <div className={styles.container}>
      <h1 style={{ color: "#1e293b" }}>Order Management</h1>
      
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td><span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>{order.status}</span></td>
              <td>
                <button onClick={() => handleView(order)} className={styles.viewBtn}>View</button>
                <button onClick={() => handleEdit(order)} className={styles.editBtn}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL FOR VIEW / EDIT */}
      {selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{isEditing ? "Edit Order" : "Order Details"}</h2>
            <hr />
            <p><strong>ID:</strong> {selectedOrder.id}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Total:</strong> Rs.{selectedOrder.total}</p>
            
            {isEditing ? (
              <div className={styles.editActions}>
                <label>Change Status:</label>
                <select 
                  defaultValue={selectedOrder.status}
                  onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ) : (
              <p><strong>Current Status:</strong> {selectedOrder.status}</p>
            )}

            <button onClick={closeModal} className={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}