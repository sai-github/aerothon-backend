// Import SearchLink controllers
const SearchLinkController = require('./elements/searchLinkController');

class SearchLinkInterface {
  constructor(context) {
    this.searchLinkServices = new SearchLinkController(context);
  }
}

module.exports = SearchLinkInterface;
