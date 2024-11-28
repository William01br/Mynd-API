import express from "express";
import {
  getPosts,
  create,
  update,
  remove,
} from "../controllers/postControllers.js";
import { getAllDataPagination } from "../middlewares/paginationMiddleware.js";

const router = express.Router();

router.get("/", getAllDataPagination, getPosts);

router.post("/", create);

router.patch("/:id", update);

router.delete("/:id", remove);

export default router;
