import { Router } from "express";
import { getUsers, updateUser, deleteUser } from "../controller/user.controller";

const router = Router();

router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
