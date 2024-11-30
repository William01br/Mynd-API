import express from "express";
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

router.post("/", create);

router.get("/:id", getPost);

router.get("/search/:title", getAllDataPagination, getPostByTitle);

router.patch("/:id", update);

router.delete("/:id", remove);

export default router;
