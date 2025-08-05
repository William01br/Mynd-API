import User from '../../infra/mongo/models/User.js';

const findAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    console.error('Error showing users in DB:', err);
  }
};

const findById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err) {
    console.error('Error finding user by ID in DB:', err);
  }
};

const register = async (credentials) => {
  try {
    const { name, username, email, password, avatar, background } = credentials;

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
    return console.error('Error registering user in DB:', err);
  }
};

const update = async (id, username, avatar, background) => {
  try {
    const updateData = { username, avatar, background };

    const sanitizedData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== null),
    );

    const update = await User.updateOne({ _id: id }, { $set: sanitizedData });
    return update;
  } catch (err) {
    console.error('Error updating user in DB:', err);
  }
};

const remove = async (id) => {
  try {
    const user = await User.deleteOne({ _id: id });
    console.log(user.deletedCount);
    return user.deletedCount;
  } catch (err) {
    console.error('Error removing user from DB:', err);
  }
};

export default { findAllUsers, findById, register, remove, update };
