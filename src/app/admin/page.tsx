"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/admin.module.css";

// Define a User interface to represent the user data
interface User {
  _id: string;
  email: string;
  createdAt: string; // You might want to use Date type if you plan to manipulate it
}

function AdminPage() {
  // Use the User type for the users state
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users); // Adjust this line based on the actual response structure
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="admin-container">
        <h1>Admin Panel</h1>
        {error && <div className="error">{error}</div>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
