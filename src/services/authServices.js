import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findByCredentials } from "../models/User.js";

const login = async (email, password) => {
  const user = await findByCredentials(email, password);

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // return user without password
  const userData = { ...user.toObject() };
  delete userData.password;

  return userData;
};
const generateToken = () => {
  const token = jwt.sign({ userId: login._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export { login, generateToken };
