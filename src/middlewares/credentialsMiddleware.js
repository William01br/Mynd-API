import { isEmailValid, isPasswordValid } from "../utils/credentials.js";

export const credentialsIsValid = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!isEmailValid(email))
    return res.status(400).json({ message: "Email must be a valid email" });
  if (!isPasswordValid(password))
    return res.status(400).json({
      message:
        "password must contain uppercase letters, lowercase letters, numbers and at least 8 characters ",
    });

  req.credentials = { username, email, password };
  next();
};
