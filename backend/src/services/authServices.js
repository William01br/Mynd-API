import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
const login = async (email, password) => {
  try {
    const emailLower = email.toLowerCase();
    const user = await User.findOne({ email: emailLower }).select("+password");
    console.log(user);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) return null;

    // return user without password
    const userData = { ...user.toObject() };
    delete userData.password;

    return userData;
  } catch (err) {
    console.error("Error finding user by credentials in DB:", err);
  }
};
const generateToken = (id) => {
  const token = jwt.sign({ userId: id }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
  return token;
};

export default { login, generateToken };
