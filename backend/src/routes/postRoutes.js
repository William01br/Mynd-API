import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import {
  getPosts,
  getPost,
  getPostByTitle,
  getPostsUser,
  create,
  update,
  remove,
  likePost,
  createComment,
  removeComment,
} from "../controllers/postControllers.js";
import { getAllDataPagination } from "../middlewares/postsPaginationMiddleware.js";
import { getDataUserPostsPagination } from "../middlewares/userPostsPaginationMiddleware.js";
import { getDataTitlePostsPagination } from "../middlewares/titlePostsPaginationMiddleware.js";

const router = express.Router();

router.get("/", getAllDataPagination, getPosts);

router.get("/user/:author_id", getDataUserPostsPagination, getPostsUser);

router.get("/search", getDataTitlePostsPagination, getPostByTitle);

router.get("/:id", authenticateToken, getPost);

router.post("/create", authenticateToken, create);

router.patch("/update/:id", authenticateToken, update);

router.patch("/:id/comment", authenticateToken, createComment);

router.patch("/:id/like", authenticateToken, likePost);

router.delete("/delete/:id", authenticateToken, remove);

router.delete("/:id/comment/:commentId", authenticateToken, removeComment);

export default router;
