import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertUser, findUser, removeUser } from "../models/database.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await insertUser(username, email, hashedPassword);

    if (result === 11000)
      return res.status(400).json({ message: "Email already registered" });

    if (!result)
      return res.status(500).json({ message: "Error inserting user" });
    // return res.status(201).json({ message: "Sucessfully added" });
    res.status(201);
    return res.render("login");
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

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
    // res.status(200).json({ token: token, message: "Login successful" });
    // console.log(token);
    res.status(200);
    return token;
    // return res.render("afterLogin");
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Error logging in" });
  }
};

const remove = async (req, res) => {
  const id = req.user.userId;

  try {
    const result = await removeUser(id);

    if (result === 0)
      return res.status(404).json({ message: "user not removed" });
    res.status(204);
    return res.render("accountDeleted");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing user", error: err.message });
  }
};

export { register, login, remove };
