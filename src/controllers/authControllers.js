import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUser, findUser, removeUser } from "../models/User.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(username, email, hashedPassword);

    if (result === 11000)
      return res.status(400).json({ message: "Email already registered" });

    if (!result)
      return res.status(500).json({ message: "Error inserting user" });
    return res.status(201).json({ message: "Sucessfully added" });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await findUser(email);
    // const user = await cursor.toArray();

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log(token);

    res.cookie("jwtToken", token, { httpOnly: true });
    return res.status(200).json({ message: "Login successful", token: token });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Error logging in" });
  }
};

const remove = async (req, res) => {
  const id = req.user.userId;
  console.log(id);

  try {
    const result = await removeUser(id);
    console.log(result);

    if (result === 0)
      return res.status(404).json({ message: "user not removed" });
    return res.status(200).json({ message: "User successfully removed" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error removing user", error: err.message });
  }
};

export { register, login, remove };
