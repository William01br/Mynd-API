import express from "express";
import { register, login, remove } from "../controllers/authControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/api/register", register);

router.post("/api/login", login);

router.delete("/api/remove", authenticateToken, remove);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/afterLogin", (req, res) => {
  res.render("afterLogin");
});

router.get("/", (req, res) => {
  res.render("index");
});

export default router;
