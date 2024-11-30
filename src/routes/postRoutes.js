import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import {
  getPosts,
  getPost,
  getPostByTitle,
  create,
  update,
  remove,
} from "../controllers/postControllers.js";
import { getAllDataPagination } from "../middlewares/paginationMiddleware.js";

const router = express.Router();

router.get("/", getAllDataPagination, getPosts);

router.post("/", authenticateToken, create);

router.get("/search", getAllDataPagination, getPostByTitle);

router.get("/:id", authenticateToken, getPost);

router.patch("/:id", authenticateToken, update);

router.delete("/:id", authenticateToken, remove);

export default router;
