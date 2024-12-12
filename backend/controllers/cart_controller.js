import user_model from "../models/user_models.js";

//Add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await user_model.findById(req.body.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await user_model.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Remove item from user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await user_model.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await user_model.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from cart!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!!!!" });
  }
};

//Fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await user_model.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!!" });
  }
};

export { addToCart, removeFromCart, getCart };
