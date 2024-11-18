import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: "string", required: true, unique: true },
    description: { type: "string", required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

async function getAllPosts(author_id) {
  try {
    const posts = await Post.find({ author_id });
    return posts;
  } catch (err) {
    console.error("Error retrieving posts from MongoDB:", err);
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

async function updateDbPost(data, titleId) {
  try {
    const update = await Post.updateOne({ title: titleId }, { $set: data });
    return update;
  } catch (err) {
    console.error("Error updating post in MongoDB:", err);
  }
}

async function deleteDbPost(titleId) {
  try {
    const result = await Post.deleteOne({ title: titleId });
    return result.deletedCount;
  } catch (err) {
    console.error("Error deleting post in MongoDB:", err);
  }
}

export { getAllPosts, insertPost, updateDbPost, deleteDbPost };
