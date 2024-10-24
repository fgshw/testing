import mongoose from 'mongoose';

// สร้างฟังก์ชันเชื่อมต่อ MongoDB
export const connectMongoDB = async (): Promise<void> => {
  try {
    // เชื่อมต่อกับ MongoDB โดยใช้ URI จาก environment variable
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
