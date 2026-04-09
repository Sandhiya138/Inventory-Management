"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./signup.css";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const newUser = { name, email, password, role };
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if user already exists
    if (existingUsers.some((u: any) => u.email === email)) {
      alert("Email already registered!");
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Signup successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1  style={{ color: "#1e293b", fontSize: "24px" }}>Create Account</h1>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <label style={{fontSize: '14px', color: '#64748b', marginBottom: '5px'}}>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="viewer">Viewer</option>
        </select>

        <button onClick={handleSignup}>Create Account</button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}