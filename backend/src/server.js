import { app } from "./app.js";
import dotenv from "dotenv";
import connect from "./database.js";
dotenv.config();

const initServer = async () => {
  await connect();
  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
};
initServer();
