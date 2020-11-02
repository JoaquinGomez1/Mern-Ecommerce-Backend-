function pagination(data) {
  return async (req, res, next) => {
    let page = parseInt(req.query.page);
    const maxAmoutOfItems = 10;

    let myData = data;

    if (!page) page = 1;
    let startIndex = (page - 1) * maxAmoutOfItems;
    let endIndex = page * maxAmoutOfItems;

    let results = {};

    results.results = await myData
      .find()
      .limit(endIndex)
      .skip(startIndex)
      .exec();

    if (endIndex < (await myData.countDocuments()))
      results.nextPage = {
        page: page + 1,
        itemsAmount: maxAmoutOfItems,
      };

    if (startIndex > 0)
      results.prevPage = {
        page: page - 1,
        itemsAmount: maxAmoutOfItems,
      };

    res.pagination = results;
    next();
  };
}

module.exports = pagination;
