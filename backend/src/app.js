import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import swaggerRoutes from "./routes/swaggerRoutes.cjs";
import { notFound } from "./middlewares/notFoundMiddleware.js";
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
