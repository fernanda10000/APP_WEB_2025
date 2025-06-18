import { Request, Response } from "express"
import { cache } from "../utils/cache";
import { generateAccessToken } from "../utils/generateToken";
import dayjs from "dayjs";
import { User } from "../models/User";
import bcrypt from "bcryptjs";


export const login =(req:Request, res:Response) =>{
let name: string = "Diego"

const {username, password}=req.body;

//Credenciales incorrectas 
if(username!=='Admin' || password!=='123456789'){
    return res.status(401)
    .json({ message: "Credenciales incorrectas" })
}
const userId = 'abc123'; 

const accessToken = generateAccessToken(userId);

cache.set(userId, accessToken, 60*15);

return res.json({
    message: 'Login',
    accessToken
})

}

export const getTime=(req:Request, res:Response)=>{
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);

    if (!ttl) {
        return res.status(404)
            .json({ message: "Token no encontrado"})
    }

    const now=Date.now();
    const timeToLifeSeconds=Math.floor((ttl-now)/1000);
    const expTime=dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTime
    })
}

export const updateTime = (req: Request, res: Response) => {
  const { userId } = req.body;

  const ttl = cache.getTtl(userId);
  if (!ttl) {
    return res.status(404).json({ message: 'Token no encontrado o expirado' });
  }

  const nuevaTTLsegundos = 60 * 10;
  cache.ttl(userId, nuevaTTLsegundos);

  res.json("Actualizado con exito");
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

// 🔹 Nuevo método para obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json({ users });
    } catch (error) {
        return res.status(500).json({ message: "Error interno", error });
    }
};

export const createUser = async (req:Request, res:Response) => {
    try {
        const { username, password, email, role } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            role,
            email,
            status: true
        });

        const user = await newUser.save();
        return res.json({ user });

    } catch (error) {
        console.log("Error ocurrido en createUser: ", error);
        return res.status(426).json({ error });
    }
};