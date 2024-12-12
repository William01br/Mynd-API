import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}?authSource=admin`);

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connect;
