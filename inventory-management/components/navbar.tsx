"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  // Helper to highlight active link
  const isActive = (path: string) => pathname === path ? styles.activeLink : "";

  return (
    <nav className={styles.nav}>
      <div className={styles.logoGroup}>
        <h2 className={styles.logoText }><b><i>Inventory</i></b> Manager </h2>
      </div>

      <div className={styles.linkGroup}>
        {/* PUBLIC LINKS */}
        {!role && (
          <>
            <a href="/#home" className={styles.navLink}>Home</a>
            <a href="/#about" className={styles.navLink}>About</a>
            <a href="/#features" className={styles.navLink}>Features</a>
            <a href="/#contact" className={styles.navLink}>Contact</a>
            <Link href="/login" className={styles.loginBtn}>Login</Link>
            <Link href="/signup" className={styles.signupBtn}>Sign Up</Link>
          </>
        )}

        {/* AUTHENTICATED ADMIN/STAFF LINKS */}
        {role && (
          <>
            <Link href="/dashboard" className={`${styles.navLink} ${isActive('/dashboard')}`}>Dashboard</Link>
            <Link href="/inventory" className={`${styles.navLink} ${isActive('/inventory')}`}>Inventory</Link>
            <Link href="/orders" className={`${styles.navLink} ${isActive('/orders')}`}>Orders</Link>
            
            {/* Admin Specific Links */}
            {role === 'admin' && (
              <>
                <Link href="/users" className={`${styles.navLink} ${isActive('/users')}`}>Users</Link>
                <Link href="/reports" className={`${styles.navLink} ${isActive('/reports')}`}>Reports</Link>
                <Link href="/alerts" className={`${styles.navLink} ${isActive('/alerts')}`}>
                  Alerts <span className={styles.alertDot}></span>
                </Link>
              </>
            )}
            
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}