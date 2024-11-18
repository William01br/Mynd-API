import express from "express";
import { allPosts, addPost } from "../controllers/postControllers.js";

const router = express.Router();

router.get("/posts", allPosts);

router.post("/post", addPost);

// router.patch("/post/:id", updatePost);

// router.delete("/post/:id", deletePost);

export default router;
