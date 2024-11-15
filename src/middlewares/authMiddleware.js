import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.redirect("/login");
    req.user = user;
    console.log(req.user.userId);
    next();
  });
};

export default authenticateToken;
