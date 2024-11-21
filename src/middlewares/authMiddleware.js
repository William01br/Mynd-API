import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(403).json({ message: "Acess denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);

    if (!verified) return res.status(400).json({ message: "Invalid token" });

    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export default authenticateToken;
