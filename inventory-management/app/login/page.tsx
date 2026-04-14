"use client";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  console.log("Input:", cleanEmail, cleanPassword);

  try {
    const res = await fetch(
      `http://localhost:5000/users?email=${encodeURIComponent(cleanEmail)}`
    );

    const data = await res.json();

    console.log("Fetched user:", data);

    if (data.length > 0) {
      const user = data[0];

      if (user.password === cleanPassword) {
        console.log("✅ Login success");

        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "viewer") {
          window.location.href = "/viewers";
        } else {
            window.location.href = "/dashboard";
        }
      } else {
        console.log("❌ Wrong password");
        alert("Invalid password");
      }
    } else {
      console.log("❌ User not found");
      alert("User not found");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className={styles.mainContainer}>
    <div className={styles.container}>
      <form className={styles.formCard} onSubmit={handleLogin}>
        <h1 style={{ color: "#1e293b", fontSize:"25px" }}>Welcome Back!!</h1>
        <input className={styles.input}
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        />

        <input className={styles.input}
  type="password" 
  placeholder="Password" 
  value={password}
  onChange={(e) => setPassword(e.target.value)} 
  required 
/>

        <button type="submit" className={styles.btn}>Login</button>
        <p style={{ color: "#64748b", marginTop: "15px" }}>
          Don't have an account? <a href="/signup" style={{ color: "#2563eb" }}>Sign up</a>
        </p>
      </form>
    </div>
    </div>
  );
}