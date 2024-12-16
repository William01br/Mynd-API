import {
  insertUser,
  findById,
  removeUser,
  findAllUsers,
  updateUser,
} from "../models/User.js";

const showUsers = async () => await findAllUsers();

const showUser = async (id) => await findById(id);

const register = async (credentials) => {
  const { name, username, email, password, avatar, background } = credentials;
  const data = await insertUser(
    name,
    username,
    email,
    password,
    avatar,
    background
  );

  return data;
};

const update = async (id, username, avatar, background) => {
  const updateData = { username, avatar, background };

  const sanitizedData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== null)
  );

  return await updateUser(sanitizedData, id);
};

const remove = async (id) => await removeUser(id);

export default { showUsers, showUser, register, remove, update };
