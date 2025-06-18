<<<<<<< HEAD
import { Document, model, now, Schema, Types } from "mongoose";

export interface User extends Document {
    id: Types.ObjectId;
    username: string;
    password: string;
    role:string;
    email:string;
    status: boolean;
    createDate: Date;
    deleteDate:Date;
    
}

const userSchema = new Schema<User>({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
         type:String,
        required:true,
   
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default: true
    }, 
    createDate: {
       type: Date,
       default: Date.now
    },
    deleteDate:{
        type:Date
    }
})

export const user=model<User>('User', userSchema, 'users');
=======
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
>>>>>>> a79b98c54feac8e0a6f86c2cfd7ad0ca17a16821
