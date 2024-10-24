import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/app/lib/mongodb'; // ฟังก์ชันเชื่อมต่อ MongoDB
import User from '@/app/model/Users'; // Model ของผู้ใช้
import bcrypt from 'bcryptjs'; // สำหรับการแฮชรหัสผ่าน
import mongoose from 'mongoose';

// GET - ดึงข้อมูลผู้ใช้ทั้งหมด
export async function GET() {
  try {
    await connectMongoDB(); // เชื่อมต่อกับ MongoDB

    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก MongoDB
    const users = await User.find({}).select('-password'); // ไม่คืนค่ารหัสผ่าน

    // ส่งข้อมูลกลับไปในรูปแบบ JSON
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch users', error }, { status: 500 });
  }
}

// POST /api/users
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();
    const db = mongoose.connection;
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 201 }
      );
    }

    // Create new user (you might want to hash the password here)
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = { email, password: hashedPassword, createdAt: new Date() };
    await usersCollection.insertOne(newUser);

    // Retrieve the newly created user without the password
    const createdUser = await usersCollection.findOne(
      { email },
      { projection: { password: 0 } } // Exclude the password from the response
    );

    return NextResponse.json(createdUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}


// PUT - อัปเดตข้อมูลผู้ใช้
export async function PUT(request: Request) {
  try {
    const { id, email, password } = await request.json(); // ดึงข้อมูลจาก request body
    console.log('Request Body:', { id, email, password }); // เช็คข้อมูลที่ถูกส่งมา

    await connectMongoDB(); // เชื่อมต่อ MongoDB

    // ตรวจสอบว่า ID มีอยู่หรือไม่
    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // เตรียมข้อมูลการอัปเดต
    const updateData: { email?: string; password?: string } = {};

    if (email) {
      updateData.email = email; // อัปเดตอีเมล
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // แฮชรหัสผ่านใหม่
      updateData.password = hashedPassword; // อัปเดตรหัสผ่าน
    }

    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true, // ให้คืนค่าผลลัพธ์ที่อัปเดตใหม่
      runValidators: true, // ตรวจสอบความถูกต้องของข้อมูล
    });

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log('Updated User:', updatedUser); // เช็คข้อมูลที่ถูกอัปเดตแล้ว

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Failed to update user:', error.message);
    return NextResponse.json({ message: 'Failed to update user', error: error.message }, { status: 500 });
  }
}

// DELETE - ลบข้อมูลผู้ใช้
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // ดึงข้อมูลจาก request body
    await connectMongoDB(); // เชื่อมต่อกับ MongoDB

    // ตรวจสอบว่า ID มีอยู่หรือไม่
    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // ลบผู้ใช้ที่มีอยู่โดยค้นหาตาม _id
    const deletedUser = await User.findByIdAndDelete(id);

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete user', error }, { status: 500 });
  }
}
