import { insertPost } from "../models/Post.js";

const allPosts = async (req, res) => {};

const addPost = async (req, res) => {
  const { title, description } = req.body;
  const id = req.user.userId;

  if (!id) return res.status(500).json({ error: "Id not found or invalid" });

  if (!title || !description)
    return res.status(400).json({ message: "Invalid post" });

  try {
    const result = await insertPost(title, description, id);
    if (!result) return res.status(500).json({ error: "Error inserting post" });
    return res.status(201).json({ message: "Post added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { allPosts, addPost };
