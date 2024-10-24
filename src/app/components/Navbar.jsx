"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // ใช้ usePathname แทน useRouter
import '../styles/Navbar.css'; // Import CSS file

const Navbar = () => {
  const [username, setUsername] = useState("");
  const pathname = usePathname(); // ใช้ usePathname เพื่อเข้าถึงเส้นทางปัจจุบัน

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username"); // ลบชื่อผู้ใช้จาก local storage
    setUsername(""); // เคลียร์ชื่อผู้ใช้
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">JapanCulture</Link>
        <div className="navbar-links">
          {/* ตรวจสอบว่าอยู่ในหน้า login หรือ register */}
          {pathname === '/login' || pathname === '/register' ? null : (
            <>
              {/* ถ้า username ไม่มีค่าแสดงปุ่ม login กับ register */}
              {!username ? (
                <>
                  <Link href="/login" className="navbar-button">Login</Link>
                  <Link href="/register" className="navbar-button">Register</Link>
                </>
              ) : (
                // ถ้า username มีค่าแสดงชื่อผู้ใช้และปุ่ม logout
                <span className="navbar-username">
                  {username}
                  <div className="dropdown-menu">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
