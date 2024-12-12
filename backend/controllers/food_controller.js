import food_model from "../models/food_model.js";
import fs from "fs";

//Add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new food_model({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//All food list
const listFood = async (req, res) => {
  try {
    const foods = await food_model.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await food_model.findById(req.body.id);
    fs.unlink(`upload/${food.image}`, () => {});
    await food_model.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
