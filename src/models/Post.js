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

// criar uma função para pesquisar através do título do post igual o reddit

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

async function countAllPosts() {
  try {
    const result = await Post.countDocuments();
    return result;
  } catch (err) {
    console.error("Error counting posts in MongoDB:", err);
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

export {
  getAllPosts,
  countAllPosts,
  findPostById,
  findPostByTitle,
  insertPost,
  updatePost,
  deletePost,
};
