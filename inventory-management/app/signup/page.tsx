"use client";
import { useState } from "react";
import "./signup.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role,
    };

    console.log("User Registered:", newUser);

    alert("Signup successful!");

    setName("");
    setEmail("");
    setPassword("");
    setRole("staff");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="viewer">Viewer</option>
        </select>

        <button onClick={handleSignup}>Register</button>
      </div>
    </div>
  );
}