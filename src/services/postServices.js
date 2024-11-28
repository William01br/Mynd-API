import {
  getAllPosts,
  insertPost,
  updatePost,
  deletePost,
  countAllPosts,
} from "../models/Post.js";

const getPosts = async (limit, offset) => await getAllPosts(limit, offset);

const countPosts = async () => await countAllPosts();

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

export default { getPosts, countPosts, create, update, remove };
