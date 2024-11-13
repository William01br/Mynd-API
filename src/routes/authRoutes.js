import express from "express";
import { register, login, remove } from "../controllers/authControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.delete("/remove", authenticateToken, remove);

export default router;
