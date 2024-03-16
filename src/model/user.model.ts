import { Schema, model } from 'mongoose';
import { Tuser } from '../interface/user.interface';

export const userSchema = new Schema<Tuser>({
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
  },
  role: {
    type: String,
    default: 'user',
  },
});

export const User = model<Tuser>('User ', userSchema);
