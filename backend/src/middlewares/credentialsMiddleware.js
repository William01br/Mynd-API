import { isEmailValid, isPasswordValid } from "../utils/credentials.js";

export const credentialsIsValid = (req, res, next) => {
  const { name, username, email, password, avatar, background } = req.body;

  if (!name || !username || !email || !password || !avatar || !background)
    return res.status(400).json({ message: "All fields must be filled in" });

  if (!isEmailValid(email))
    return res.status(400).json({ message: "Email must be a valid email" });
  if (!isPasswordValid(password))
    return res.status(400).json({
      message:
        "password must contain uppercase letters, lowercase letters, numbers and at least 8 characters ",
    });

  req.credentials = { name, username, email, password, avatar, background };
  next();
};
