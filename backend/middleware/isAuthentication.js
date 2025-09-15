import jwt from "jsonwebtoken";

export const isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookie.token;
    if (!token) {
      return res.status(401).json({
        message: "user not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({
          message: "invalid token",
          success: false,
        });
    };
    req.id = decode.userId;
    next();
  } catch (e) {
    console.log("Error", e);
  }
};
