import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrder,
  placedOrder,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/order_controller.js";

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placedOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorder", authMiddleware, userOrder);
orderRouter.get("/listorder", listOrder);
orderRouter.post("/status", updateStatus);

export default orderRouter;
