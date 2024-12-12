import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food_route.js";
import userRouter from "./routes/user_route.js";
import 'dotenv/config'
import cartRouter from "./routes/cart_route.js";
import orderRouter from "./routes/order_route.js";

// app config
const app = express();
const port = 4000;

//middelware
app.use(express.json());
app.use(cors());

//DB connection
connectDB();

//API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('upload'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

//mongodb+srv://sanhao2502:Hao250202@cluster0.kku5x.mongodb.net/?
