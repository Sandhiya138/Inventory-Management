/*"use client";
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
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch messages to see how many we have
    const checkMessages = () => {
  fetch("http://localhost:5000/messages")
    .then(res => res.json())
    .then(data => {
      // Only count messages that are NOT read
      const unread = data.filter((m: any) => !m.isRead);
      setUnreadCount(unread.length);
    });
};

    checkMessages();
    const interval = setInterval(checkMessages, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Helper to highlight active link
  const isActive = (path: string) => pathname === path ? styles.activeLink : "";

  return (
    <nav className={styles.nav}>
      <div className={styles.logoGroup}>
        <h2 className={styles.logoText }><b><i>Inventory</i></b> Manager </h2>
      </div>

      <div className={styles.linkGroup}>
     
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

        
        {role && (
          <>
            <Link href="/dashboard" className={`${styles.navLink} ${isActive('/dashboard')}`}>Dashboard</Link>
            <Link href="/inventory" className={`${styles.navLink} ${isActive('/inventory')}`}>Inventory</Link>
            <Link href="/orders" className={`${styles.navLink} ${isActive('/orders')}`}>Orders</Link>
            <Link href="/reports" className={`${styles.navLink} ${isActive('/reports')}`}>Reports</Link>
          
            {role === 'admin' && (
              <>
                <Link href="/users" className={`${styles.navLink} ${isActive('/users')}`}>Users</Link>
                
                <Link href="/alerts" className={`${styles.navLink} ${isActive('/alerts')}`}>
                  Alerts <span className={styles.alertDot}></span>
                </Link>
                <Link href="/messages" className={styles.bellContainer}>
      <div className={styles.bellIcon}>
        🔔
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </div>
    </Link>
                               
              </>
            )}
            
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}*/
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  useEffect(() => {
    const checkMessages = () => {
      fetch("http://localhost:5000/messages")
        .then((res) => res.json())
        .then((data) => {
          const unread = data.filter((m: any) => !m.isRead);
          setUnreadCount(unread.length);
        })
        .catch((err) => console.error("Error fetching messages:", err));
    };

    if (role === 'admin') {
      checkMessages();
      const interval = setInterval(checkMessages, 30000);
      return () => clearInterval(interval);
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const isActive = (path: string) => (pathname === path ? styles.activeLink : "");

  return (
    <nav className={styles.nav}>
      <div className={styles.logoGroup}>
        <h2 className={styles.logoText}>
          <b><i>Inventory</i></b> Manager
        </h2>
      </div>

      <div className={styles.linkGroup}>
        {/* 1. PUBLIC LINKS (Not Logged In) */}
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

        {/* 2. VIEWER LINKS (Restricted Access) */}
        {role === "viewer" && (
          <>
            <Link href="/viewers" className={`${styles.navLink} ${isActive('/viewers')}`}>
              Reports & Analytics
            </Link>
          </>
        )}

        {/* 3. ADMIN/STAFF LINKS (Management Access) */}
        {(role === "admin" || role === "staff") && (
          <>
            <Link href="/dashboard" className={`${styles.navLink} ${isActive('/dashboard')}`}>Dashboard</Link>
            <Link href="/inventory" className={`${styles.navLink} ${isActive('/inventory')}`}>Inventory</Link>
            <Link href="/orders" className={`${styles.navLink} ${isActive('/orders')}`}>Orders</Link>
            <Link href="/reports" className={`${styles.navLink} ${isActive('/reports')}`}>Reports</Link>
          </>
        )}

        {/* 4. ADMIN ONLY LINKS (User Mgmt & Messages) */}
        {role === "admin" && (
          <>
            <Link href="/users" className={`${styles.navLink} ${isActive('/users')}`}>Users</Link>
            <Link href="/messages" className={styles.bellContainer}>
              <div className={styles.bellIcon}>
                🔔
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
              </div>
            </Link>
          </>
        )}

        {/* LOGOUT BUTTON (Shown for any logged-in role) */}
        {role && (
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}