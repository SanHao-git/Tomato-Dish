import user_model from "../models/user_models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await user_model.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Email or password is wrong, please enter again!!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Email or password is wrong, please enter again!!",
      });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error!!"})
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //Checking is user already exist?
    const exist = await user_model.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    //Validating email for & strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email!!",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password!!",
      });
    }

    //Hasing  user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user_model({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
