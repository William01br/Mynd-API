import {
  insertUser,
  findById,
  removeUser,
  findAllUsers,
} from "../models/User.js";

const showUsers = async () => await findAllUsers();

const showUser = async (id) => await findById(id);

const register = async (credentials) => await insertUser(credentials);

const remove = async (id) => await removeUser(id);

export default { showUsers, showUser, register, remove };
