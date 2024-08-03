import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) throw new Error("No token provided");

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) throw new Error("Malformed token");

    const verified = jwt.verify(token, process.env.SESS_KEY);

    req.user = verified;

    next();
  } catch (error) {
    let errorMessage = "Invalid token";
    if (error instanceof jwt.TokenExpiredError) {
      errorMessage = "Token has expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      errorMessage = "Invalid token";
    } else if (error.message === "Malformed token") {
      errorMessage = "Malformed token";
    } else if (error.message === "No token provided") {
      errorMessage = "No token provided";
    }

    return res
      .status(401)
      .json({ code: 401, success: false, message: errorMessage });
  }
};
