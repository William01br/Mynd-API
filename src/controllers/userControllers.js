import * as userService from "../services/userService.js";

const showUsers = async (req, res) => {
  try {
    const users = await userService.showUsers();
    if (users.length === 0)
      return res.status(404).json({ message: "There are no users" });
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const showUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userService.showUser(id);
    if (!user) return res.status(400).json({ message: "Id not found" });
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

    if (!result)
      return res.status(500).json({ message: "Error inserting user" });
    return res.status(201).json({ message: "Sucessfully added" });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Error registering user" });
  }
};

const remove = async (req, res) => {
  const id = req.user.userId;
  console.log(id);

  try {
    const result = await userService.remove(id);
    console.log(result);

    if (result === 0)
      return res.status(404).json({ message: "user not removed" });
    return res.status(200).json({ message: "User successfully removed" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error removing user", error: err.message });
  }
};

export { showUsers, showUser, register, remove };
