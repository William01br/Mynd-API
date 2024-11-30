import postServices from "../services/postServices.js";
import { sliceString } from "../utils/sliceUtils.js";

export const getAllDataPagination = async (req, res, next) => {
  let { limit, offset, title } = req.query;

  limit = Number(limit) || 5;
  offset = Number(offset) || 0;
  title = title || "";

  try {
    const amount = await postServices.countPosts();
    // const currentUrl = req.baseUrl;
    const currentUrl = sliceString(req.originalUrl);

    const nextTotal = limit + offset;
    let nextUrl;
    if (!title) {
      nextUrl =
        nextTotal < amount
          ? `${currentUrl}?limit=${limit}&offset=${nextTotal}`
          : null;
    } else {
      nextUrl =
        nextTotal < amount
          ? `${currentUrl}?title=${title}&limit=${limit}&offset=${nextTotal}`
          : null;
    }

    const previous = offset - limit < 0 ? null : offset - limit;
    let previousUrl;
    if (!title) {
      previousUrl =
        previous !== null
          ? `${currentUrl}?limit=${limit}&offset=${previous}`
          : null;
    } else {
      previousUrl =
        previous !== null
          ? `${currentUrl}?title=${title}&limit=${limit}&offset=${previous}`
          : null;
    }

    req.dataPagination = {
      nextUrl: nextUrl,
      previousUrl: previousUrl,
      limit: limit,
      offset: offset,
      title: title,
    };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
