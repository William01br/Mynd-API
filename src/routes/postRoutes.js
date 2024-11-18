import express from "express";
import {
  allPosts,
  addPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.get("/posts", allPosts);

router.post("/post", addPost);

router.patch("/post/:title", updatePost);

router.delete("/post/:title", deletePost);

export default router;
