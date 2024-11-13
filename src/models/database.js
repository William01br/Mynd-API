import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

let singleton;

async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    singleton = client.db(process.env.MONGO_DATABASE);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }

  return singleton;
}

export { connect };
