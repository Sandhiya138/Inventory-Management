"use client";
import { useState, useEffect } from "react";
import styles from "./orders.module.css";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    product: "",
    quantity: 1,
    amount: 0,
    status: "Pending"
  });

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`)
    ]).then(async ([ordRes, invRes]) => {
      setOrders(await ordRes.json());
      setInventory(await invRes.json());
    });
  }, []);

  // 🔹 Handle Product Selection
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProd = inventory.find(item => item.name === e.target.value);

    setNewOrder({
      ...newOrder,
      product: e.target.value,
      amount: selectedProd ? selectedProd.price * newOrder.quantity : 0
    });
  };

  // 🔹 Handle Quantity Change
  const handleQuantityChange = (qty: number) => {
    const selectedProd = inventory.find(item => item.name === newOrder.product);

    setNewOrder({
      ...newOrder,
      quantity: qty,
      amount: selectedProd ? selectedProd.price * qty : 0
    });
  };

  // 🔹 Add Order + Reduce Stock
  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedItem = inventory.find(i => i.name === newOrder.product);

    if (!selectedItem) {
      alert("Please select a product");
      return;
    }

    if (selectedItem.quantity < newOrder.quantity) {
      alert("Not enough stock!");
      return;
    }

    const orderToSave = {
      ...newOrder,
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split("T")[0]
    };

    // Save Order
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderToSave)
    });

    if (res.ok) {
      const saved = await res.json();

      // 🔥 Reduce Stock
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${selectedItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: selectedItem.quantity - newOrder.quantity
        })
      });

      setOrders([...orders, saved]);

      // Reset form
      setNewOrder({
        customerName: "",
        product: "",
        quantity: 1,
        amount: 0,
        status: "Pending"
      });
    }
  };

  // 🔹 Update Order Status
  const updateStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      setOrders(orders.map(o =>
        o.id === id ? { ...o, status: newStatus } : o
      ));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Management</h1>

      {/* 🔹 ORDER FORM */}
      <div className={styles.formCard}>
        <h3>Create New Order</h3>

        <form onSubmit={handleAddOrder} className={styles.addForm}>
          <input
            type="text"
            placeholder="Customer Name"
            value={newOrder.customerName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, customerName: e.target.value })
            }
            required
          />

          <select
            value={newOrder.product}
            onChange={handleProductChange}
            className={styles.selectInput}
            required
          >
            <option value="">Select Product</option>
            {inventory.map(item => (
              <option
                key={item.id}
                value={item.name}
                disabled={item.quantity === 0}
              >
                {item.name} ({item.quantity} available)
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            min="1"
            value={newOrder.quantity}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            required
          />

          <input
            type="number"
            placeholder="Total Amount"
            value={newOrder.amount}
            readOnly
          />

          <button type="submit" className={styles.addBtn}>
            Place Order
          </button>
        </form>
      </div>

      {/* 🔹 ORDER TABLE */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td className={styles.nameCell}>{order.customerName}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>Rs. {order.amount?.toLocaleString()}</td>

                <td>
                  <select
                    value={order.status}
                    className={styles.statusSelect}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}