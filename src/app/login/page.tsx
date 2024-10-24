// Login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import "../styles/Login.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("username", data.username); // เก็บ username จาก API
      setError("");
      router.push("/"); // ไปยังหน้า page.tsx หรือหน้าหลัก
    } else {
      const data = await res.json();
      setError(data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <div className="error">{error}</div>}
          <input
            className="nameemail"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="namepassword"
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="log-in">Login</button>
        </form>
        <h4>
          Don't have an account? Go to{" "}
          <a href="/register" className="register-link">Register</a> page
        </h4>
      </div>
    </div>
  );
}

export default LoginPage;
