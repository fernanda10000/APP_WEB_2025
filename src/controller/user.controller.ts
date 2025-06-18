import { Request, Response } from "express";
import { user as UserModel } from "../models/User";

// GET all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({ status: true });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};


// PUT update user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

// DELETE soft delete user (status false)

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.status === false) {
      return res.status(400).json({ message: "Usuario ya está inactivo" });
    }

    user.status = false; // Cambiamos status a false para borrado lógico
    await user.save();

    res.status(200).json({ message: "Usuario inhabilitado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al inhabilitar usuario", error });
  }
};
