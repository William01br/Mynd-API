import postServices from "../services/postServices.js";

const getPosts = async (req, res) => {
  try {
    const { nextUrl, previousUrl, limit, offset } = req.dataPagination;

    const result = await postServices.getPosts(limit, offset);
    // console.log(result);

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
  // console.log(postId);
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

const getPostsUser = async (req, res) => {
  const { nextUrl, previousUrl, limit, offset, user_id } = req.dataPagination;
  console.log(nextUrl);

  try {
    const result = await postServices.getPostsByUserId(user_id, limit, offset);
    console.log(result);
    if (result.length === 0)
      return res.status(404).json({ message: `This user don't have posts` });

    if (!result) return res.status(404).json({ message: "UserId not found" });

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

const getPostByTitle = async (req, res) => {
  const { nextUrl, previousUrl, limit, offset, title } = req.dataPagination;
  console.log(nextUrl, previousUrl);

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

// atualiza o post pelo ID do post.
const update = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const actionIsValid = await postServices.actionIsValid(id, userId);

    if (!actionIsValid)
      return res.status(403).json({
        message: "The user don't have permission to update this post",
      });

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
  const userId = req.userId;

  try {
    const actionIsValid = await postServices.actionIsValid(id, userId);

    if (!actionIsValid)
      return res.status(403).json({
        message: "The user don't have permission to remove this post",
      });

    const postDeleted = await postServices.remove(id);
    if (postDeleted === 0)
      return res.status(400).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  try {
    const result = await postServices.addLikePost(postId, userId);

    if (!result) {
      const result = await postServices.removeLikePost(postId, userId);
      return res.status(200).json({ message: "Like removed successfully" });
    }
    return res.status(200).json({ message: "Like added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createComment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  const { comment } = req.body;

  if (!comment)
    return res.status(400).json({ message: "Write a message to comment!" });

  try {
    const result = await postServices.createComment(postId, userId, comment);

    if (!result) return res.status(400).json({ message: "null" });
    return res.status(201).json({ message: "Comment added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export {
  getPosts,
  getPost,
  getPostsUser,
  getPostByTitle,
  create,
  update,
  remove,
  likePost,
  createComment,
};
