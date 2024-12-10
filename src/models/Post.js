import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    likes: { type: Array, required: true },
    comments: { type: Array, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

async function getAllPosts(limit, offset) {
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
}

// recebe um objeto vazio ou userId.
async function countAllPosts(filter) {
  try {
    const result = await Post.countDocuments(filter);
    return result;
  } catch (err) {
    console.error("Error counting posts in MongoDB:", err);
  }
}

async function countAllPostsByTitle(title) {
  try {
    const result = await Post.countDocuments({
      title: { $regex: `^${title}`, $options: "i" },
    });
    return result;
  } catch (err) {
    console.error("Error counting posts by title in MongoDB:", err);
  }
}

async function findPostById(id) {
  try {
    const result = await Post.findById({ _id: id }).populate("author_id");
    return result;
  } catch (err) {
    console.error("Error finding post in MongoDB:", err);
  }
}

async function findPostsByUserId(user_id, limit, offset) {
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
}

async function findPostByTitle(title, limit, offset) {
  try {
    const result = await Post.find({
      title: { $regex: `^${title}`, $options: "i" },
    })
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author_id");
    return result;
  } catch (err) {
    console.error("Error finding post by title in MongoDB:", err);
  }
}

async function insertPost(title, description, author_id) {
  try {
    const newPost = new Post({
      title,
      description,
      author_id,
    });
    await newPost.save();
    return { sucess: true };
  } catch (err) {
    console.error("Error inserting post in MongoDB:", err);
  }
}

async function updatePost(data, id) {
  try {
    const update = await Post.updateOne({ _id: id }, { $set: data });
    return update;
  } catch (err) {
    console.error("Error updating post in MongoDB:", err);
  }
}

async function deletePost(id) {
  try {
    const result = await Post.deleteOne({ _id: id });
    return result.deletedCount;
  } catch (err) {
    console.error("Error deleting post in MongoDB:", err);
  }
}

async function addLike(postId, userId) {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: postId, "likes.userId": { $nin: [userId] } },
      { $push: { likes: { userId, created: new Date() } } }
    );
    return result;
  } catch (err) {
    console.error("Error adding like in post on MongoDB:", err);
  }
}

async function removeLike(postId, userId) {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { likes: { userId } } }
    );
    return result;
  } catch (err) {
    console.error("Error removing like in post on MongoDB:", err);
  }
}

export {
  getAllPosts,
  countAllPosts,
  findPostById,
  findPostByTitle,
  insertPost,
  updatePost,
  deletePost,
  findPostsByUserId,
  countAllPostsByTitle,
  addLike,
  removeLike,
};
