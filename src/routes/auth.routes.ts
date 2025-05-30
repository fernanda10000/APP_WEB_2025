import { Router } from "express";
import { getAllUsers, updateTime, getUserByUsername, createUser, getTime, login } from "../controller/auth.controllers";

const router = Router();

router.post('/login-user', login);//Ruta del controlador/endpoint
router.get('/getTime', getTime);
router.put('/updateTime', updateTime);
router.get('/users', getAllUsers);
router.get('/user/:username', getUserByUsername);
router.post('/users', createUser);

export default router;