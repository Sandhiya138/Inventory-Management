"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = [
      { email: "admin@gmail.com", password: "1234", role: "admin" },
      { email: "staff@gmail.com", password: "1234", role: "staff" },
      { email: "viewer@gmail.com", password: "1234", role: "viewer" },
    ];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("role", user.role);
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
     
        <p style={{ marginTop: "15px", textAlign: "center", color: "#555" }}>
        Don’t have an account?{" "}
        <a href="/signup" style={{ color: "blue" }}>
        Sign Up
        </a>
      </p>
    </div>
    </div>
    </>
  );
}