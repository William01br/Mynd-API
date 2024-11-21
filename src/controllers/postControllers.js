import {
  getAllPosts,
  insertPost,
  updateDbPost,
  deleteDbPost,
} from "../models/Post.js";

const allPosts = async (req, res) => {
  const id = req.user.userId;
  if (!id) return res.status(500).json({ error: "Id not found or invalid" });

  try {
    const result = await getAllPosts(id);
    if (result.length === 0)
      return res.status(500).json({ message: "There are no Posts" });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

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

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const updateData = { title: title, description: description };
  const sanitizedData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== null)
  );

  try {
    const result = await updateDbPost(sanitizedData, id);

    if (result.matchedCount === 0)
      return res
        .status(400)
        .json({ message: `There are no posts with this title '${id}'` });

    if (!result.acknowledged)
      return res
        .status(500)
        .json({ message: "This post could not be updated" });
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const postDeleted = await deleteDbPost(id);
    if (postDeleted === 0)
      return res.status(400).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { allPosts, addPost, updatePost, deletePost };
