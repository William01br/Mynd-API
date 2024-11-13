import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUser, findUser, removeUser } from "../models/database.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(username, email, hashedPassword);

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

  try {
    const cursor = await findUser(email);
    const user = await cursor.toArray();

    if (!cursor)
      return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user[0].password);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token, message: "Login successful" });
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
    return res.status(204);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing user", error: err.message });
  }
};

export { register, login, remove };
