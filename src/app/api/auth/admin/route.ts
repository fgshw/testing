import { connectMongoDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/model/Users";

export async function GET() {
    try {
      await connectMongoDB();
      const users = await User.find({}).select('-password');  // ไม่ส่งฟิลด์รหัสผ่านกลับไป
      return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    }
  }