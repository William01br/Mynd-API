import {
  getAllPosts,
  findPostById,
  findPostByTitle,
  insertPost,
  updatePost,
  deletePost,
  countAllPosts,
  findPostsByUserId,
  countAllPostsByTitle,
} from "../models/Post.js";

const getPosts = async (limit, offset) => await getAllPosts(limit, offset);

const getPost = async (id) => await findPostById(id);

const getPostsByUserId = async (user_id, limit, offset) =>
  await findPostsByUserId(user_id, limit, offset);

const getPostByTitle = async (title, limit, offset) =>
  await findPostByTitle(title, limit, offset);

const countPosts = async (filter) => {
  if (typeof filter !== "object") {
    throw new Error("The filter must be an object.");
  }

  if (Object.keys(filter)[0] === "title") {
    console.log(filter.title);
    return await countAllPostsByTitle(filter.title);
  }
  return await countAllPosts(filter);
};

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

export default {
  getPosts,
  getPost,
  getPostByTitle,
  getPostsByUserId,
  countPosts,
  create,
  update,
  remove,
};
