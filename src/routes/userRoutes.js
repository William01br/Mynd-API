import express from "express";
import {
  getUsers,
  getUser,
  register,
  remove,
} from "../controllers/userControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { credentialsIsValid } from "../middlewares/credentialsMiddleware.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/register", credentialsIsValid, register);

router.delete("/remove", authenticateToken, remove);

export default router;
