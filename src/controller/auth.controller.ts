import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateToken";
import NodeCache from "node-cache";
import dayjs from "dayjs";
import { user as User } from "../models/User";
import bcrypt from "bcrypt";


// Crear instancia de caché
const cache = new NodeCache();

// Endpoint: Iniciar sesión
export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Credenciales incorrectas (validación simple)
    if (username !== 'Admin' || password !== '123456789') {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const userId = 'abc123';
    const accessToken = generateAccessToken(userId);

    // Guardar token en caché por 15 minutos
    cache.set(userId, accessToken, 60 * 15);

    return res.json({
        message: 'Login exitoso',
        accessToken
    });
};

// Endpoint: Obtener tiempo de vida del token
export const getTime = (req: Request, res: Response) => {
    const { userId } = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404).json({ message: "Token no encontrado" });
    }

    const now = Date.now();
    const timeToLifeSeconds = Math.floor((ttl - now) / 1000);
    const expTIme = dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTIme
    });
};

// Endpoint: Actualizar tiempo de vida del token
export const updateTIme = (req: Request, res: Response) => {
    const { userId } = req.body;

    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({ message: 'Token no encontrado o expirado' });
    }

    const nuevaTTLsegundos = 60 * 10;
    cache.ttl(userId, nuevaTTLsegundos);

    res.json({ message: "Actualizado con éxito" });
};

// Endpoint: Obtener todos los usuarios
export const getAllUser = async (req: Request, res: Response) => {
    try {
        const userlist = await User.find();
        return res.json({ userlist });
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

// ✅ NUEVO Endpoint: Registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body;

        // Validar campos requeridos
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Verificar si ya existe usuario con ese email o username
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({ message: "El usuario ya existe." });
        }

        // Crear nuevo usuario
        const newUser = new User({
            username,
            email,
            password,
            role,
            status: true, // Por defecto, el usuario está activo
        });
        //const user = await newUser.save();
        // Guardar el nuevo usuario en la base de datos
        await newUser.save();  

        return res.status(201).json({ message: "Usuario registrado correctamente", newUser });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }
};

// 🔹 Nuevo método para obtener usuario por username
export const getUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Error interno", error });
    }
};

// Endpoint: Cifrar una contraseña
export const hashPassword = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Se requiere una contraseña." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return res.json({
            original: password,
            hashed: hashedPassword
        });
    } catch (error) {
        console.error("Error al cifrar contraseña:", error);
        return res.status(500).json({ message: "Error al cifrar la contraseña." });
    }
};
