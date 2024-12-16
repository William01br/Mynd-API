import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, required: true },
    background: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

async function findAllUsers() {
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

async function findByCredentials(email) {
  try {
    const emailLower = email.toLowerCase();
    const user = await User.findOne({ email: emailLower }).select("+password");
    console.log(user.email);
    console.log(user.password);

    return user;
  } catch (err) {
    console.error("Error finding user by credentials in DB:", err);
  }
}

async function insertUser(name, username, email, password, avatar, background) {
  try {
    const newUser = new User({
      name,
      username,
      email,
      password,
      avatar,
      background,
    });
    return await newUser.save();
  } catch (err) {
    if (err.code === 11000) return 11000;
    return console.error("Error registering user in DB:", err);
  }
}

async function updateUser(id, data) {
  try {
    const update = await User.updateOne({ _id: id }, { $set: data });
    return update;
  } catch (err) {
    console.error("Error updating user in DB:", err);
  }
}

async function removeUser(id) {
  try {
    const user = await User.deleteOne({ _id: id });
    console.log(user.deletedCount);
    return user.deletedCount;
  } catch (err) {
    console.error("Error removing user from DB:", err);
  }
}

export {
  findByCredentials,
  findAllUsers,
  findById,
  insertUser,
  removeUser,
  updateUser,
};
