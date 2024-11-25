import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "Acess denied: Token not found or invalid" });

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    if (!verified)
      return res.status(403).json({ message: "Invalid token or expired" });

    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default authenticateToken;
