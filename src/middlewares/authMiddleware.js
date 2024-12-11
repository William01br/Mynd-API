import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Acess denied: Token not found" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    req.userId = decoded.userId;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res
        .status(403)
        .json({ message: "Token expired", expiredAt: err.expiredAt });

    if (err.name === "JsonWebTokenError")
      return res.status(403).json({ message: "Invalid signature" });
    return res.status(500).json({ message: err.message });
  }
};

export default authenticateToken;
