import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Admin privileges required' 
    });
  }
  next();
};

export const requireInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor' || req.user.instructorStatus !== 'approved') {
    return res.status(403).json({ 
      success: false,
      message: 'Approved instructor privileges required' 
    });
  }
  next();
};

export default isAuthenticated ;