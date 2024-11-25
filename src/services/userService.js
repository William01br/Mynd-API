import {
  insertUser,
  findById,
  removeUser,
  findAllUsers,
} from "../models/User.js";

const showUsers = async () => {
  return await findAllUsers();
};

const showUser = async (id) => {
  return await findById(id);
};

const register = async (credentials) => {
  return await insertUser(credentials);
};

const remove = async (id) => {
  return await removeUser(id);
};

export { showUsers, showUser, register, remove };
