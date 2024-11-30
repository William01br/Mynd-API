import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import { notFound } from "./src/middlewares/notFound.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("json spaces", 2);

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

app.use(notFound);

export { app };
