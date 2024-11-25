import express from "express";
import {
  showUsers,
  register,
  remove,
  showUser,
} from "../controllers/userControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { credentialsIsValid } from "../middlewares/credentialsMiddleware.js";

const router = express.Router();

router.get("/", showUsers);

router.get("/:id", showUser);

router.post("/register", credentialsIsValid, register);

router.delete("/remove", authenticateToken, remove);

export default router;
