// app/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  //firstName: string;
  //lastName: string;
  //createdAt: Date;
  //updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  //firstName: { type: String },
  //lastName: { type: String },
  //createdAt: { type: Date, default: Date.now },
  //updatedAt: { type: Date, default: Date.now },
});

// Check if the model is already compiled to avoid overwriting
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
