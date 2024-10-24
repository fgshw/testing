import { NextResponse } from "next/server";
import mongoose from "mongoose"; // ต้องแน่ใจว่ามีการนำเข้า mongoose
import { connectMongoDB } from "@/app/lib/mongodb"; // ปรับเส้นทางให้ถูกต้อง
import bcrypt from "bcryptjs"; // ใช้สำหรับ hash รหัสผ่าน

// POST /api/auth/register
export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // ตรวจสอบว่า name, email, password ไม่ว่างเปล่า
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please complete all input fields" },
        { status: 400 }
      );
    }

    // เชื่อมต่อกับ MongoDB
    await connectMongoDB();
    const db = mongoose.connection; // ใช้ mongoose.connection หลังจากการเชื่อมต่อสำเร็จ
    const usersCollection = db.collection("users");

    // ตรวจสอบว่า email ถูกใช้งานไปแล้วหรือไม่
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }

    // Hash password ก่อนบันทึกลงฐานข้อมูล
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลผู้ใช้ใหม่ลงฐานข้อมูล
    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword, // เก็บ hashed password เพื่อความปลอดภัย
    });

    // ส่งข้อความตอบกลับเมื่อการลงทะเบียนสำเร็จ
    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
