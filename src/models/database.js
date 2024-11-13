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

const database = async () => {
  const db = await connect();
  await db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password"],
        properties: {
          username: {
            bsonType: "string",
            minLength: 3,
          },
          email: {
            bsonType: "string",
            pattern: "^.+@.+..+$",
          },
          password: {
            bsonType: "string",
            minLength: 8,
          },
        },
      },
    },
  });
  const usersCollection = db.collection("users");
  await usersCollection.createIndex({ email: 1 }, { unique: true });
};
database();

async function insertUser(username, email, password) {
  try {
    const db = await connect();
    const usersCollection = db.collection("users");

    await usersCollection.insertOne({
      username: username,
      email: email,
      password: password,
    });

    // criar um middleware para verificar se já existe um email igual ao fornecido.

    return { sucess: true };
  } catch (err) {
    console.error("Error inserting user: ", err);
  }
}

export { connect, insertUser };
