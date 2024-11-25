import postServices from "../services/postServices.js";

const getPosts = async (req, res) => {
  const id = req.user.userId;
  if (!id) return res.status(500).json({ error: "Id not found or invalid" });

  try {
    const result = await postServices.getPosts(id);
    if (result.length === 0)
      return res.status(500).json({ message: "There are no Posts" });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  const { title, description } = req.body;
  const id = req.user.userId;

  if (!id) return res.status(500).json({ error: "Id not found or invalid" });

  if (!title || !description)
    return res.status(400).json({ message: "Invalid post" });

  try {
    const result = await postServices.create(title, description, id);
    if (!result) return res.status(500).json({ error: "Error inserting post" });
    return res.status(201).json({ message: "Post added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const result = await postServices.update(title, description, id);

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

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const postDeleted = await postServices.remove(id);
    if (postDeleted === 0)
      return res.status(400).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getPosts, create, update, remove };
