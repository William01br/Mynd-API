import express from "express";
import { connect } from "./src/models/database.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.get("/check-db-connection", async (req, res) => {
  const db = await connect();
  if (db) return res.status(200).send("MongoDB connection established");
  return res.status(500).send("Connection error");
});

export { app };
