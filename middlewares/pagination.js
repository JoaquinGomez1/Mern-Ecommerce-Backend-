function pagination(data) {
  return (req, res, next) => {
    let page = parseInt(req.query.page);
    const maxAmoutOfItems = 10;
    let myData = data;
    if (!page) page = 1;
    let startIndex = (page - 1) * maxAmoutOfItems;
    let endIndex = page * maxAmoutOfItems;

    let results = {};

    if (req.query.search) {
      const regEx = new RegExp(req.query.search, "gi");
      const filteredProducts = data.filter((each) => regEx.exec(each.name));
      myData = filteredProducts;
      results.results = filteredProducts;
    } else {
      results.results = myData.slice(startIndex, endIndex);
    }

    if (endIndex < myData.length)
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
