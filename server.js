import { app } from "./src/app.js";
import dotenv from "dotenv";
import connect from "./src/database.js";
dotenv.config();

const initServer = async () => {
  await connect();
  app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
  });
};
initServer();
