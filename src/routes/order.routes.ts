import { Router } from "express";
import { createOrder, getOrders, updateOrder, deleteOrder } from "../controller/order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
