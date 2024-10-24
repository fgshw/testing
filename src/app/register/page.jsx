"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import "../styles/RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !email || !password) {
      setError("Please complete all input fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        setError("");
        setSuccess("User registration successfully!");
        form.reset(); // Reset form fields
      } else {
        const data = await res.json(); // Read the error message from the response
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>

          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md">
              {success}
            </div>
          )}

          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Username"
            required
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
            required
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your Password"
            required
          />
          <button type="submit">Register</button>
        </form>
        <hr className="my-3" />
        <h4>
          Already have an account? Go to <Link href="/login">Login</Link> page
        </h4>
      </div>
    </div>
  );
}

export default RegisterPage;
