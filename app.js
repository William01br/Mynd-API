import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import swaggerRoutes from "./src/routes/swaggerRoutes.js";
import { notFound } from "./src/middlewares/notFoundMiddleware.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("json spaces", 2);

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/posts", postRoutes);

app.use("/doc", swaggerRoutes);

app.use(notFound);

export { app };
