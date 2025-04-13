import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NODE_SECRET;

export const generateToken = (user) => {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
