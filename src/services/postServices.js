import {
  getAllPosts,
  insertPost,
  updatePost,
  deletePost,
} from "../models/Post.js";

const getPosts = async (id) => await getAllPosts(id);

const create = async (title, description, id) =>
  await insertPost(title, description, id);

const update = async (title, description, id) => {
  const updateData = { title: title, description: description };

  const sanitizedData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== null)
  );

  return await updatePost(sanitizedData, id);
};

const remove = async (id) => await deletePost(id);

export default { getPosts, create, update, remove };
