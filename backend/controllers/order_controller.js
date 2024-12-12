import order_model from "../models/order_model.js";
import Stripe from "stripe";
import user_model from "../models/user_models.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placedOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new order_model({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await user_model.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const lineItem = req.body.items.map((item) => ({
      price_data: {
        currency: "sgd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 134,
      },
      quantity: item.quantity,
    }));

    lineItem.push({
      price_data: {
        currency: "sgd",
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: 2 * 134,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItem,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!!" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await order_model.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await order_model.findOneAndDelete(orderId);
      res.json({ success: false, message: "Not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!!!!" });
  }
};

//User order for frontend
const userOrder = async (req, res) => {
  try {
    const orders = await order_model.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log();
    res.json({ success: false, message: "Error!" });
  }
};

//List orders for admin panel
const listOrder = async (req, res) => {
  try {
    const orders = await order_model.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!@" });
  }
};

//Api for updating order status
const updateStatus = async (req, res) => {
  try {
    await order_model.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!!!!" });
  }
};

export { placedOrder, verifyOrder, userOrder, listOrder, updateStatus };
