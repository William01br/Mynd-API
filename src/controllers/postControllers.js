import postServices from "../services/postServices.js";

const getPosts = async (req, res) => {
  try {
    const { nextUrl, previousUrl, limit, offset } = req.dataPagination;

    const result = await postServices.getPosts(limit, offset);
    console.log(result);

    if (result.length === 0)
      return res.status(200).json({ message: "There are no Posts" });

    return res.status(200).json({
      nextUrl: nextUrl,
      previousUrl: previousUrl,
      limit: limit,
      offset: offset,
      results: result.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        likes: item.likes,
        comments: item.comments,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        username: item.author_id.username,
      })),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getPost = async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  try {
    const result = await postServices.getPost(postId);
    if (!result) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({
      result: {
        id: result._id,
        title: result.title,
        description: result.description,
        likes: result.likes,
        comments: result.comments,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
        username: result.author_id.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getPostByTitle = async (req, res) => {
  const { nextUrl, previousUrl, limit, offset, title } = req.dataPagination;

  try {
    const result = await postServices.getPostByTitle(title, limit, offset);
    // console.log(result);

    if (result.length === 0)
      return res
        .status(200)
        .json({ message: "There are no Posts with this title" });

    if (!result) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({
      nextUrl: nextUrl,
      previousUrl: previousUrl,
      limit: limit,
      offset: offset,
      results: result.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        likes: item.likes,
        comments: item.comments,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        username: item.author_id.username,
      })),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  const { title, description } = req.body;
  const id = req.userId;

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

export { getPosts, getPost, getPostByTitle, create, update, remove };
