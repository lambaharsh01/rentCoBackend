import jwt from "jsonwebtoken";

export const createToken = (object) => {
  return jwt.sign(object, process.env.SESS_KEY, { expiresIn: "2h" });
};
