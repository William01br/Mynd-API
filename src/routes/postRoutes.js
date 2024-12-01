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
} from "../controllers/postControllers.js";
import { getAllDataPagination } from "../middlewares/postsPaginationMiddleware.js";
import { getDataUserPostsPagination } from "../middlewares/userPostsPaginationMiddleware.js";
import { getDataTitlePostsPagination } from "../middlewares/titlePostsPaginationMiddleware.js";

const router = express.Router();

router.get("/", getAllDataPagination, getPosts);

router.post("/", authenticateToken, create);

router.get("/user/:author_id", getDataUserPostsPagination, getPostsUser);

router.get("/search", getDataTitlePostsPagination, getPostByTitle);

router.get("/:id", authenticateToken, getPost);

router.patch("/:id", authenticateToken, update);

router.delete("/:id", authenticateToken, remove);

export default router;
