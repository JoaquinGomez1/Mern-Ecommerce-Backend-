function pagination(data) {
  return (req, res, next) => {
    let { page } = parseInt(req.query);
    const maxAmoutOfItems = 10;

    if (page <= 0 || !page) page = 1;

    const startIndex = (page - 1) * maxAmoutOfItems;
    const endIndex = page * maxAmoutOfItems;

    const results = {};

    if (endIndex < data.length)
      results.nextPage = {
        page: page + 1,
        itemsAmount: maxAmoutOfItems,
      };

    if (startIndex > 0)
      results.prevPage = {
        page: page - 1,
        itemsAmount: maxAmoutOfItems,
      };

    results.results = data.slice(startIndex, endIndex);
    res.pagination = results;
    next();
  };
}

module.exports = pagination;
