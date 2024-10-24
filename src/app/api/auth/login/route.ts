// login/route.ts
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/mongodb"; // เส้นทางนี้ขึ้นอยู่กับที่คุณเก็บฟังก์ชันนี้
import bcrypt from "bcryptjs"; // ใช้สำหรับตรวจสอบรหัสผ่าน
import mongoose from "mongoose"; // ใช้ในการทำงานกับ MongoDB

// POST /api/auth/login
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ตรวจสอบว่า email และ password ถูกกรอกเข้ามาครบถ้วน
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please enter both email and password" },
        { status: 400 }
      );
    }

    // เชื่อมต่อกับ MongoDB
    await connectMongoDB();
    const db = mongoose.connection;
    const usersCollection = db.collection("users");

    // ค้นหาผู้ใช้ด้วย email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ตรวจสอบรหัสผ่าน (ใช้ bcrypt เพื่อเปรียบเทียบ)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ถ้ารหัสผ่านถูกต้อง ส่งชื่อผู้ใช้และข้อความสำเร็จ
    return NextResponse.json(
      { message: "Login successful!", username: user.name }, // ส่ง username
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
