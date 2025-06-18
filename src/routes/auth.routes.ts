import { Router } from "express";
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
