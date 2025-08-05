import postServices from '../../use-cases/services/postServices.js';
import { sliceString } from '../../shared/utils/sliceUtils.js';

export const getDataUserPostsPagination = async (req, res, next) => {
  let { limit, offset } = req.query;

  limit = Number(limit) || 5;
  offset = Number(offset) || 0;
  const user_id = req.params.author_id;

  try {
    const amount = await postServices.countPosts({ author_id: user_id });
    const currentUrl = sliceString(req.originalUrl);

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
      user_id: user_id,
    };
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
