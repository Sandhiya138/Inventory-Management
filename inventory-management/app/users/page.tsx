"use client";
import { useState, useEffect } from "react";
import styles from "./users.module.css";
import { getData, deleteData } from "@/utils/api";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // NEW USER STATE
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getData("users");
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // ✅ ADD USER
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newUser, id: Date.now().toString() }),
    });

    if (res.ok) {
      const saved = await res.json();
      setUsers([...users, saved]);
      setNewUser({ name: "", email: "", password: "", role: "viewer" });
    }
  };

  // DELETE
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Remove ${name}?`)) {
      const success = await deleteData("users", id);
      if (success) {
        setUsers(users.filter((u) => u.id !== id));
      }
    }
  };

  // UPDATE ROLE
  const updateUserRole = async (id: string, newRole: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>

     
      <div className={styles.formCard}>
        <h3>Add New User</h3>
        <form onSubmit={handleAddUser} className={styles.form}>
          <input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <input
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="viewer">Viewer</option>
          </select>

          <button type="submit">Add User</button>
        </form>
      </div>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 👤 USER LIST */}
      <div className={styles.userGrid}>
        {filteredUsers.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>

              <select
                value={user.role}
                onChange={(e) =>
                  updateUserRole(user.id, e.target.value)
                }
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <button
              onClick={() => handleDelete(user.id, user.name)}
              className={styles.deleteBtn}
              disabled={user.email === "admin@gmail.com"}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}