"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <h2>Welcome, {role}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* Total Products */}
        <div style={cardStyle}>
          <h3>Total Products</h3>
          <p>50</p>
        </div>

        {/* Low Stock */}
        <div style={cardStyle}>
          <h3>Low Stock Items</h3>
          <p>5</p>
        </div>

        {/* Orders */}
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>20</p>
        </div>

      </div>

      {/* Role Based Content */}
      <div style={{ marginTop: "30px" }}>
        {role === "admin" && <p>Admin: Full access to system</p>}
        {role === "staff" && <p>Staff: Manage inventory & orders</p>}
        {role === "viewer" && <p>Viewer: View only access</p>}
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "150px",
  textAlign: "center" as const,
};