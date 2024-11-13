import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUser } from "../models/database.js";

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

export { register };
