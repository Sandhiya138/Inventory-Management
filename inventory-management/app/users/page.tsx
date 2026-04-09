"use client";
import { useState, useEffect } from "react";
import styles from "./users.module.css";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const updateUserRole = (email: string, newRole: string) => {
    const updated = users.map(u => u.email === email ? { ...u, role: newRole } : u);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const deleteUser = (email: string) => {
    if (confirm("Permanently remove this user's access?")) {
      const updated = users.filter((u) => u.email !== email);
      setUsers(updated);
      localStorage.setItem("users", JSON.stringify(updated));
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 style={{ color: "#1e293b", fontSize: "24px" }}>User Management</h1>
        <input 
          type="text" 
          placeholder="Search users by name or email..." 
          className={styles.searchBar}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.userGrid}>
        {filteredUsers.map((user, index) => (
          <div key={index} className={styles.userCard}>
            <div className={styles.userInfo}>
              <h3 style={{ color: "#1e293b", margin: "0 0 5px 0" }}>{user.name}</h3>
              <p style={{ color: "#64748b", margin: "0 0 10px 0" }}>{user.email}</p>
              
              <select 
                className={styles.roleSelect}
                value={user.role} 
                onChange={(e) => updateUserRole(user.email, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <button onClick={() => deleteUser(user.email)} className={styles.deleteBtn}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}