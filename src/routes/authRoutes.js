import express from "express";
import { register } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/register", register);

router.post("/login");

router.post("/remove");

export default router;
