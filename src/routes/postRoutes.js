import express from "express";
import {
  allPosts,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.get("/", allPosts);

router.post("/add", addPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
