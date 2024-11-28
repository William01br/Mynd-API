import postServices from "../services/postServices.js";

export const getAllDataPagination = async (req, res, next) => {
  let { limit, offset } = req.query;

  limit = Number(limit) || 5;
  offset = Number(offset) || 0;

  try {
    const amount = await postServices.countPosts();
    const currentUrl = req.baseUrl;

    const nextTotal = limit + offset;
    const nextUrl =
      nextTotal < amount
        ? `${currentUrl}?limit=${limit}&offset=${nextTotal}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous !== null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    req.dataPagination = {
      nextUrl: nextUrl,
      previousUrl: previousUrl,
      limit: limit,
      offset: offset,
    };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
