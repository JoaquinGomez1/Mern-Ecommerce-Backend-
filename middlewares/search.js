// This middleware only works with mongoose models.
// the data passed as a parameter HAS to be a mongoose model for this to work
function searchHigherOrder(data, field) {
  return async function search(req, res, next) {
    // Check if there is a search query first.
    const { search } = req.query;
    if (!search) {
      next();
    }

    let { page } = req.query;
    if (!page) page = 1;

    const maxAmoutOfItems = 10;
    let startIndex = (page - 1) * maxAmoutOfItems;
    let endIndex = page * maxAmoutOfItems;

    const results = {};
    const regEx = new RegExp(search, "gi");
    const filteredProducts = await data
      .find({ [field]: { $regex: regEx } })
      .limit(endIndex)
      .skip(startIndex);

    results.results = filteredProducts;

    if (endIndex < results.results.length) {
      results.nextPage = {
        page: page + 1,
        itemsAmount: maxAmoutOfItems,
      };

      if (startIndex > 0)
        results.prevPage = {
          page: page - 1,
          itemsAmount: maxAmoutOfItems,
        };
    }

    res.pagination = results;
    next();
  };
}

module.exports = searchHigherOrder;
