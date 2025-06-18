import { Document, model, now, Schema, Types } from "mongoose";

export interface Product extends Document {
    Name: string;
    id: Types.ObjectId;
    Description: string;
    qty: number;
    status: boolean;
    price: number;
    createDate: Date;
    deleteDate: Date;
}

const productSchema = new Schema<Product>({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Description: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    deleteDate: {
        type: Date
    }
})

export const product = model<Product>('Product', productSchema, 'product');