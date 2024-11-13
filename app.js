import express from "express";
import { connect } from "./src/models/database.js";
import authRoutes from "./src/routes/authRoutes.js";
const app = express();

app.set("json spaces", 2);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/check-db-connection", async (req, res) => {
  const db = await connect();
  if (db) return res.status(200).send("MongoDB connection established");
  return res.status(500).send("Connection error");
});

export { app };
