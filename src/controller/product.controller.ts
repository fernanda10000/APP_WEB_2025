import { Request, Response } from 'express';
import { product } from '../models/Product';

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new product({
      ...req.body,
      createDate: new Date(),
    });

    await newProduct.save();
    res.status(201).json({ message: 'Producto creado', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

// Obtener todos los productos activos
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await product.find({ status: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Actualizar producto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto actualizado', product: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

// Eliminar (lógicamente) producto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await product.findByIdAndUpdate(
      req.params.id,
      {
        status: false,
        deleteDate: new Date(),
      },
      { new: true }
    );
    if (!deleted) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    res.status(200).json({ message: 'Producto eliminado.', product: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto.', error });
  }
};
