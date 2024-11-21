import express from "express";
import {
  showAllUsers,
  register,
  login,
  remove,
  showUser,
} from "../controllers/authControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { credentialsIsValid } from "../middlewares/credentialsMiddleware.js";

const router = express.Router();

router.get("/users", showAllUsers);

router.get("/user/:id", showUser);

router.post("/register", credentialsIsValid, register);

router.post("/login", login);

router.delete("/remove", authenticateToken, remove);

export default router;
