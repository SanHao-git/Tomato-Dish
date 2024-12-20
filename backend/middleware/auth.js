import jwt from "jsonwebtoken";

const authMiddelware = async (req, res, next) => {
  const { token } = req.headers;
  
  if (!token) {
    return res.json({
      success: false,
      message: "Please login to do this action!!",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

export default authMiddelware;
