import {
  insertUser,
  findById,
  removeUser,
  findAllUsers,
} from "../models/User.js";

const showUsers = async () => await findAllUsers();

const showUser = async (id) => await findById(id);

const register = async (credentials) => {
  const { name, username, email, password } = credentials;
  const data = await insertUser(name, username, email, password);

  // desestructure the data without the password
  const { password: _, ...dataFiltered } = data;
  return dataFiltered;
};

const remove = async (id) => await removeUser(id);

export default { showUsers, showUser, register, remove };
