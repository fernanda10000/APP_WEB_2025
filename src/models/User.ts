import { Document, Schema, Types, model } from "mongoose";


export interface User extends Document {
  _id:Types.ObjectId;
  username: string;
  password: string;
  role: string;
  email: string;
  status: boolean;
  createDate: Date;
  deleteDate: Date ;
}
const UserSchema = new Schema<IUser>({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date
    }
})

export const User = model<IUser>('User', UserSchema, 'user');