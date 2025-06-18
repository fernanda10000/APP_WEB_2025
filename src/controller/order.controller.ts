import { Request, Response } from 'express';
import { order } from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    if (!payload.products || !Array.isArray(payload.products) || payload.products.length === 0) {
      return res.status(400).json({ message: 'Debes incluir al menos un producto.' });
    }

    const subtotal = payload.products.reduce((acc: number, item: any) =>
      acc + item.quantity * item.price, 0);
    const total = subtotal;

    const newOrder = new order({
      ...payload,
      subtotal,
      total,
      createDate: new Date(),
      updateDate: new Date()
    });

    await newOrder.save();

    return res.status(201).json({ message: 'Orden creada correctamente', order: newOrder });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// GET all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await order.find();
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// PUT update order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Forzamos que el status siempre sea 'pagado' al actualizar
    const updatedData = {
      ...req.body,
      status: "pagado",
      updateDate: new Date(),
    };

    const updatedOrder = await order.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    return res.status(200).json({ message: 'Orden actualizada', order: updatedOrder });
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// DELETE order
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedOrder = await order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    return res.status(200).json({ message: 'Orden eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
