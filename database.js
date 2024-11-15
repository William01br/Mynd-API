import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connect;

async function insertUser(username, email, password) {}

async function findUser(email) {}

async function removeUser(id) {}

export { connect, insertUser, findUser, removeUser };
