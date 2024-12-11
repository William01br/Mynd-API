import userService from "../services/userService.js";

const getUsers = async (req, res) => {
  try {
    const users = await userService.showUsers();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userService.showUser(id);
    if (!user) return res.status(404).json({ message: "Id not found" });
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const register = async (req, res) => {
  try {
    const result = await userService.register(req.credentials);

    if (result === 11000)
      return res.status(400).json({ message: "Email already registered" });

    return res.status(201).json({ message: "Sucessfully added" });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Error registering user" });
  }
};

const remove = async (req, res) => {
  const id = req.userId;

  try {
    const result = await userService.remove(id);

    if (result === 0)
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    return res.status(200).json({ message: "Sucessfully removed" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error removing user", error: err.message });
  }
};

export { getUsers, getUser, register, remove };
