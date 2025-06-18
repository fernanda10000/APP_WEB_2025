import { Document, model, Schema, Types } from 'mongoose';

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface Order extends Document {
  idUser: string;
  total: number;
  subtotal: number;
  createDate: Date;
  status: string;
  updateDate: Date;
  products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

const orderSchema = new Schema<Order>({
  idUser: { type: String, required: true },
  total: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  products: {
    type: [orderProductSchema],
    required: true,
    validate: [(arr: any[]) => arr.length > 0, 'Debe incluir al menos un producto.'],
  },
  createDate: { type: Date, default: Date.now },
  status: { type: String, required: true },
  updateDate: { type: Date, default: Date.now },
});

export const order = model<Order>('Order', orderSchema, 'order');
