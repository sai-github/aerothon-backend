const mongoose = require('mongoose');

const SearchLink = require('../../../../models/SearchLinkModel');

class SearchLinkRepository {
  constructor() {
    this.searchLinkModel = SearchLink;
  }

  fetchSearchLink(condition = {}) {
    return this.searchLinkModel.findOne(condition).exec();
  }

  fetchAllSearchLink(condition = {}) {
    return this.searchLinkModel.find(condition).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.searchLinkModel.findOneAndUpdate(condition, fields, {new: true}).exec();
  }

  // eslint-disable-next-line class-methods-use-this
  saveUser(searchLink) {
    return searchLink.save();
  }

  create(searchLink) {
    // eslint-disable-next-line new-cap
    let searchLinkModel = new this.searchLinkModel();
    searchLinkModel = Object.assign(searchLinkModel, searchLink);
    searchLinkModel._id = new mongoose.Types.ObjectId().toHexString();
    return searchLinkModel.save();
  }

  deleteSearchLink(condition){
    return this.searchLinkModel.findByIdAndRemove(condition).exec();
  }
}

module.exports = SearchLinkRepository;
