import postServices from '../../use-cases/services/postServices.js';
import { sliceString } from '../../shared/utils/sliceUtils.js';

export const getDataTitlePostsPagination = async (req, res, next) => {
  let { limit, offset, title } = req.query;

  limit = Number(limit) || 5;
  offset = Number(offset) || 0;
  title = title || '';

  try {
    const amount = await postServices.countPosts({ title: title });
    console.log(amount);

    const currentUrl = sliceString(req.originalUrl);

    const nextTotal = limit + offset;
    const nextUrl =
      nextTotal < amount
        ? `${currentUrl}?title=${title}&limit=${limit}&offset=${nextTotal}`
        : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous !== null
        ? `${currentUrl}?title=${title}&limit=${limit}&offset=${previous}`
        : null;

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
