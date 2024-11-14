import express from "express";
import { connect } from "./src/models/database.js";
import authRoutes from "./src/routes/authRoutes.js";
import { notFound } from "./src/middlewares/notFound.js";
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("json spaces", 2);

app.set("view engine", "ejs");

app.set("views", "./src/views");

app.use("/", authRoutes);

// app.use("/", indexRoutes);

app.get("/check-db-connection", async (req, res) => {
  const db = await connect();
  if (db) return res.status(200).send("MongoDB connection established");
  return res.status(500).send("Connection error");
});

app.use(notFound);

export { app };
