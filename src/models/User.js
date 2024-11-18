import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

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

async function findUser(email) {
  try {
    const user = await User.findOne({ email });
    console.log(user);
    return user;
  } catch (err) {
    console.error("Error finding user in DB:", err);
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

export { insertUser, findUser, removeUser };
