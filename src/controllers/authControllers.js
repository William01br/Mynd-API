import * as authServices from "../services/authServices.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);

  if (!email || !password)
    return res.status(400).json({ error: "Enter all the information" });

  try {
    const user = await authServices.login(email, password);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = authServices.generateToken();
    console.log(token);
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Error logging in" });
  }
};
