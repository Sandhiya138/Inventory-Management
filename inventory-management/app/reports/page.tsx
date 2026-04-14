/*"use client";
import { useEffect, useState } from "react";
import styles from "./reports.module.css";

export default function ReportsPage() {
  const [reportData, setReportData] = useState({
    totalSales: 0,
    itemCount: 0,
    lowStockAlerts: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes, orderRes] = await Promise.all([
          fetch("http://localhost:5000/inventory"),
          fetch("http://localhost:5000/orders")
        ]);

        const inventory = await invRes.json();
        const orders = await orderRes.json();

        // Calculations
        const sales = orders.reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);
        const stock = inventory.reduce((sum: number, i: any) => sum + Number(i.quantity), 0);
        const lowStock = inventory.filter((i: any) => i.quantity < 5).length;

        setReportData({
          totalSales: sales,
          itemCount: stock,
          lowStockAlerts: lowStock,
          recentOrders: orders.slice(-5).reverse() // Show last 5 orders
        });
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className={styles.loading}>Generating Reports...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Business Analytics</h1>

      <div className={styles.summaryGrid}>
        <div className={styles.cardBlue}>
          <h4>Total Revenue</h4>
          <p className={styles.bigNumber}>Rs. {reportData.totalSales.toLocaleString()}</p>
        </div>
        <div className={styles.cardGreen}>
          <h4>Warehouse Units</h4>
          <p className={styles.bigNumber}>{reportData.itemCount}</p>
        </div>
        <div className={styles.cardOrange}>
          <h4>Low Stock Alerts</h4>
          <p className={styles.bigNumber}>{reportData.lowStockAlerts}</p>
        </div>
      </div>

      <section className={styles.recentSection}>
        <h3>Recent Transactions</h3>
        <table className={styles.reportTable}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.recentOrders.map((order: any) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td className={styles.boldText}>{order.product}</td>
                <td>Rs. {order.amount?.toLocaleString()}</td>
                <td>
                  <span className={styles.statusBadge}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}*/
"use client";
import { useEffect, useState } from "react";
import styles from "./reports.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ReportsPage() {
  const [reportData, setReportData] = useState({
    totalRevenue: 0,
    totalStockValue: 0,
    lowStockCount: 0,
    categoryStats: {} as any,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

useEffect(() => {
  const userRole = localStorage.getItem("role");

  if (userRole !== "admin" && userRole !== "staff") {
    alert("Access Denied ❌");
    window.location.href = "/login";
  }

  setRole(userRole || "");
}, []);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const [invRes, orderRes] = await Promise.all([
          fetch("http://localhost:5000/inventory"),
          fetch("http://localhost:5000/orders")
        ]);

        const inventory = await invRes.json();
        const orders = await orderRes.json();

        // 1. Revenue & Stock Value
        const revenue = orders.reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);
        const stockVal = inventory.reduce((sum: number, i: any) => sum + (Number(i.price) * Number(i.quantity)), 0);
        
        // 2. Low Stock & Category breakdown
        const lowStock = inventory.filter((i: any) => i.quantity < 5).length;
        const categories: any = {};
        inventory.forEach((item: any) => {
          categories[item.category] = (categories[item.category] || 0) + Number(item.quantity);
        });

        setReportData({
          totalRevenue: revenue,
          totalStockValue: stockVal,
          lowStockCount: lowStock,
          categoryStats: categories,
          recentOrders: orders.slice(-5).reverse()
        });
      } catch (err) {
        console.error("Report Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, []);

  if (loading) return <div className={styles.loading}>Analyzing Data...</div>;
  const chartData = Object.entries(reportData.categoryStats).map(([name, value]) => ({
  name,
  value
}));
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Business Intelligence</h1>

      <div className={styles.summaryGrid}>
        <div className={styles.cardBlue}>
          <h4>Total Revenue</h4>
          <p className={styles.bigNumber}>Rs. {reportData.totalRevenue.toLocaleString()}</p>
        </div>
        <div className={styles.cardGreen}>
          <h4>Inventory Value</h4>
          <p className={styles.bigNumber}>Rs. {reportData.totalStockValue.toLocaleString()}</p>
        </div>
        <div className={styles.cardOrange}>
          <h4>Low Stock</h4>
          <p className={styles.bigNumber}>{reportData.lowStockCount} Items</p>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.statsCard}>
          <h3>📦 Stock by Category</h3>
          {Object.entries(reportData.categoryStats).map(([cat, qty]: any) => (
            <div key={cat} className={styles.statRow}>
              <span>{cat}</span>
              <span className={styles.badge}>{qty} Units</span>
            </div>
          ))}
        </div>
        <div className={styles.statsCard}>
  <h3>📊 Category Stock Chart</h3>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  </ResponsiveContainer>
</div>

        <div className={styles.statsCard}>
          <h3>🕒 Latest Sales</h3>
          {reportData.recentOrders.map((order: any) => (
            <div key={order.id} className={styles.statRow}>
              <span>{order.product}</span>
              <span className={styles.amountText}>Rs. {order.amount?.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className={styles.statsCard}>
  <h3>📊 Inventory Movement</h3>
  <p>Total Products: {Object.keys(reportData.categoryStats).length}</p>
  <p>
  Total Units in Warehouse: {
    (Object.values(reportData.categoryStats) as number[])
      .reduce((a, b) => a + b, 0)
  }
</p>
  <p style={{ color: "#dc2626", fontWeight: "bold" }}>
    Low Stock Items: {reportData.lowStockCount}
  </p>
</div>
      </div>
    </div>
  );
}