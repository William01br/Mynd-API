import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findByCredentials } from "../models/User.js";

const login = async (email, password) => {
  const user = await findByCredentials(email);

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  // return user without password
  const userData = { ...user.toObject() };
  delete userData.password;

  return userData;
};
const generateToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
  return token;
};

export default { login, generateToken };
