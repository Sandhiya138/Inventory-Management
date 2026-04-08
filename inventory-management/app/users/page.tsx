"use client";
import { useState, useEffect } from "react";
import styles from "./users.module.css";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const deleteUser = (email: string) => {
    const updated = users.filter((u: any) => u.email !== email);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>Manage permissions and system access</p>
      </div>

      <div className={styles.userGrid}>
        {users.map((user: any, index) => (
          <div key={index} className={styles.userCard}>
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span className={styles.roleTag}>{user.role}</span>
            </div>
            <button onClick={() => deleteUser(user.email)} className={styles.deleteBtn}>
              Remove Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}