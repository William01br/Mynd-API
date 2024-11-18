import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

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

export { insertPost };
