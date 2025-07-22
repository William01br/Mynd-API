import express from "express";
import {
  getUsers,
  getUser,
  register,
  remove,
  update,
} from "../controllers/userControllers.js";
import authenticateToken from "../middlewares/authMiddleware.js";
import { credentialsIsValid } from "../middlewares/credentialsMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getUsers);

router.get("/:id", getUser);

router.post("/register", credentialsIsValid, register);

router.post("/update", authenticateToken, update);

router.delete("/remove", authenticateToken, remove);

export default router;
