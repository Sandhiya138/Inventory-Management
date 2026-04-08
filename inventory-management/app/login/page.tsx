"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 1. Hardcoded test users
    const hardcodedUsers = [
      { email: "admin@gmail.com", password: "1234", role: "admin" },
      { email: "staff@gmail.com", password: "1234", role: "staff" },
    ];

    // 2. Users from Signup (localStorage)
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Combine both lists
    const allUsers = [...hardcodedUsers, ...storedUsers];

    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("role", user.role);
      // Force a page refresh to update the Navbar state
      window.location.href = "/dashboard"; 
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome Back</h1>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login to Dashboard</button>
        <p className="login-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}