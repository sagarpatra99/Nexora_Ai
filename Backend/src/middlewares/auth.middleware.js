import jwt from "jsonwebtoken";

export const identifyUser = async (req, res, next) => {
  let token = req.cookies.token;

  // // Also check Authorization header if cookie not present
  // if (!token) {
  //   const authHeader = req.headers.authorization;
  //   if (authHeader && authHeader.startsWith('Bearer ')) {
  //     token = authHeader.substring(7);
  //   }
  // }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      err: err.message,
    });
  }
};
