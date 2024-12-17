import Post from "../models/Post.js";

const getPosts = async (limit, offset) => {
  try {
    const posts = await Post.find()
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author_id");
    return posts;
  } catch (err) {
    console.error("Error retrieving posts from MongoDB:", err);
  }
};

const getPost = async (id) => await findPostById(id);

const getPostsByUserId = async (user_id, limit, offset) => {
  try {
    const result = await Post.find({ author_id: user_id })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author_id");
    return result;
  } catch (err) {
    console.error("Error finding posts by user in MongoDB:", err);
  }
};

const getPostByTitle = async (title, limit, offset) =>
  await findPostByTitle(title, limit, offset);

const countPosts = async (filter) => {
  if (typeof filter !== "object") {
    throw new Error("The filter must be an object.");
  }

  try {
    if (Object.keys(filter)[0] === "title") {
      console.log(filter.title);
      return await Post.countDocuments({
        title: { $regex: `^${title}`, $options: "i" },
      });
    }

    // filter is a object null
    return await Post.countDocuments(filter);
  } catch (err) {
    console.error("Error counting posts in MongoDB:", err);
  }
};

const create = async (title, description, author_id) => {
  try {
    const newPost = new Post({
      title,
      description,
      author_id,
    });
    return await newPost.save();
  } catch (err) {
    console.error("Error inserting post in MongoDB:", err);
  }
};

const update = async (title, description, id) => {
  try {
    const updateData = { title: title, description: description };

    const sanitizedData = Object.fromEntries(
      Object.entries(updateData).filter(([_, value]) => value !== null)
    );

    return await Post.updateOne({ _id: id }, { $set: sanitizedData });
  } catch (err) {
    console.error("Error updating post in MongoDB:", err);
  }
};

const remove = async (id) => {
  try {
    const result = await Post.deleteOne({ _id: id });
    return result.deletedCount;
  } catch (err) {
    console.error("Error deleting post in MongoDB:", err);
  }
};

const actionIsValid = async (postId, userId) => {
  const result = await getPostsByUserId(userId);

  const existence = result.some((post) => post._id.toString() === postId);
  return existence;
};

const addLikePost = async (postId, userId) => {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: postId, "likes.userId": { $nin: [userId] } },
      { $push: { likes: { userId, created: new Date() } } }
    );
    return result;
  } catch (err) {
    console.error("Error adding like in post on MongoDB:", err);
  }
};

const removeLikePost = async (postId, userId) => {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: { userId } } }
    );
    return result;
  } catch (err) {
    console.error("Error removing like in post on MongoDB:", err);
  }
};

const createComment = async (postId, userId, comment) => {
  try {
    const commentId = Math.floor(Date.now() * Math.random()).toString(36);
    return await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: {
          comments: { commentId, userId, comment, createdAt: new Date() },
        },
      },
      { new: true }
    );
  } catch (err) {
    console.error("Error inserting comment on MongoDB:", err);
  }
};

const removeComment = async (postId, commentId, userId) => {
  try {
    const result = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $pull: {
          comments: { commentId, userId },
        },
      }
    );
    return result;
  } catch (err) {
    console.error("Error deleting comment on MongoDB");
  }
};

export default {
  getPosts,
  getPost,
  getPostByTitle,
  getPostsByUserId,
  countPosts,
  create,
  update,
  remove,
  actionIsValid,
  addLikePost,
  removeLikePost,
  createComment,
  removeComment,
};
