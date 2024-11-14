import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) return res.status(401).json({ message: "Acess denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Intern error server", error: err.message });
  }
};

export default authenticateToken;

// middleware para caminhos NOT FOUND
