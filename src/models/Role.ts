import { Document, model, now, Schema, Types } from "mongoose";

export interface role extends Document {
    id: Types.ObjectId;
    name: string;
    type: string;
    status: boolean;
}

const roleSchema = new Schema<role>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

export const roleModel = model<role>('Role', roleSchema, 'role');