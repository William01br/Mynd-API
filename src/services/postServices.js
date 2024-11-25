import {
  getAllPosts,
  insertPost,
  updateDbPost,
  deleteDbPost,
} from "../models/Post.js";

const allPosts = async (id) => {
  return await getAllPosts(id);
};

const addPost = async (title, description, id) => {
  return await insertPost(title, description, id);
};

const updatePost = async (title, description, id) => {
  const updateData = { title: title, description: description };

  const sanitizedData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== null)
  );

  return await updateDbPost(sanitizedData, id);
};

const deletePost = async (id) => {
  return await deleteDbPost(id);
};

export { allPosts, addPost, updatePost, deletePost };
