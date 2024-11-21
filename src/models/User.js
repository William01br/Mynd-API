import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

async function showUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    console.error("Error showing users in DB:", err);
  }
}

async function findById(id) {
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err) {
    console.error("Error finding user by ID in DB:", err);
  }
}

async function insertUser(username, email, password) {
  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    return { sucess: true };
  } catch (err) {
    if (err.code === 11000) return 11000;
    console.error("Error registering user in DB:", err);
  }
}

async function findByCredentials(email, password) {
  try {
    email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    return user;
  } catch (err) {
    console.error("Error finding user by credentials in DB:", err);
  }
}

async function removeUser(id) {
  try {
    const user = await User.deleteOne({ _id: ObjectId(id) });
    return user.deletedCount;
  } catch (err) {
    console.error("Error removing user from DB:", err);
  }
}

export { findByCredentials, showUsers, findById, insertUser, removeUser };
