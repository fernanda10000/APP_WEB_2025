import { Router } from "express";
<<<<<<< HEAD
import { getAllUser, getTime, login, updateTIme, registerUser, getUserByUsername, hashPassword// Importar el nuevo controlador
} from "../controller/auth.controller";

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTime);
router.put('/updateTIme', updateTIme);
router.get('/user', getAllUser);
// Nuevo endpoint para registrar usuarios
router.post('/register-user', registerUser);

router.get('/user/:username', getUserByUsername);
router.post('/hash-password', hashPassword);

//agregar comentario
export default router;
=======
import { getAllUsers, updateTime, getUserByUsername, createUser, getTime, login } from "../controller/auth.controllers";

const router = Router();

router.post('/login-user', login);//Ruta del controlador/endpoint
router.get('/getTime', getTime);
router.put('/updateTime', updateTime);
router.get('/users', getAllUsers);
router.get('/user/:username', getUserByUsername);
router.post('/users', createUser);

export default router;
>>>>>>> a79b98c54feac8e0a6f86c2cfd7ad0ca17a16821
