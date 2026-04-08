"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <nav className={styles.nav}>
      <h2 className={styles.title}>InventoryPro</h2>

      <div className={styles.linkGroup}>
        {/* PUBLIC LINKS */}
        {!role && (
          <>
            <a href="/#home" className={styles.navLink}>Home</a>
            <a href="/#about" className={styles.navLink}>About</a>
            <a href="/#features" className={styles.navLink}>Features</a>
            <a href="/#contact" className={styles.navLink}>Contact</a>
            <Link href="/login" className={styles.loginBtn}>Login</Link>
          </>
        )}

        {/* AUTHENTICATED ADMIN/STAFF LINKS */}
        {role && (
          <>
            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link href="/inventory" className={styles.navLink}>Inventory</Link>
            <Link href="/orders" className={styles.navLink}>Orders</Link>
            
            {/* Admin Only Links */}
            {role === 'admin' && (
              <>
                <Link href="/users" className={styles.navLink}>Users</Link>
                <Link href="/reports" className={styles.navLink}>Reports</Link>
              </>
            )}
            
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}