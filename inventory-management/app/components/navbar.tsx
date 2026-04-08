"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "black" }}><b><i>Inventory</i></b> Management</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/inventory">Inventory</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgb(0, 219, 226);",
  padding: "15px 20px",
};