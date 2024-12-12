import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cart_controller.js";
import authMiddelware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddelware, addToCart);
cartRouter.post("/remove", authMiddelware, removeFromCart);
cartRouter.post("/get", authMiddelware, getCart);

export default cartRouter;