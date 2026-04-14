"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "staff" });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Connectivity Check: Check if user already exists
      const checkRes = await fetch(`http://localhost:5000/users?email=${formData.email}`);
      const existing = await checkRes.json();

      if (existing.length > 0) {
        alert("This email is already registered in the system.");
        return;
      }

      // 2. Save to JSON Server
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Account created successfully!");
        router.push("/login");
      }
    } catch (err) {
      alert("Error: Make sure JSON Server is running on port 5000!");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleSignup}>
        <h1 style={{ color: "#1e293b", fontSize:"25px" }}>Join to Explore!!</h1>
        
        <label className={styles.label}>Full Name</label>
        <input type="text" className={styles.input} placeholder="Name"
          onChange={(e) => setFormData({...formData, name: e.target.value})} required />

        <label className={styles.label}>Email Address</label>
        <input type="email" className={styles.input} placeholder="Email"
          onChange={(e) => setFormData({...formData, email: e.target.value})} required />

        <label className={styles.label}>Password</label>
        <input type="password" className={styles.input}  placeholder="password"
          onChange={(e) => setFormData({...formData, password: e.target.value})} required />

        <label className={styles.label}>Select Role</label>
        <select className={styles.input} value={formData.role} 
          onChange={(e) => setFormData({...formData, role: e.target.value})}>
          <option value="admin">Admin </option>
          <option value="staff">Staff </option>
          <option value="viewer">Viewer</option>
        </select>

        <button type="submit" className={styles.btn}>Sign Up</button>
        <p className="login-link" style={{color:"black"}}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}