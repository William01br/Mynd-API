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

export default Post;
