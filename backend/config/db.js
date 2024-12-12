import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sanhao2502:hao.2502@cluster0.kku5x.mongodb.net/?retryWrites=true&w=majority&appName=UnisexShop"
    )
    .then(() => console.log("DB connected"));
};
