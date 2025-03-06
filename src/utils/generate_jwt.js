import jwt from "jsonwebtoken";

const generateTokenFunc = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "20m",
  });
  return token;
};

export default generateTokenFunc;
