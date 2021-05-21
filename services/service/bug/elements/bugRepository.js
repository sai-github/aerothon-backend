const mongoose = require('mongoose');

const Bug = require('../../../../models/BugModel');

class BugRepository {
  constructor() {
    this.bugModel = Bug;
  }

  fetchBug(condition = {}) {
    return this.bugModel
      .find(condition)
      .sort([['priority', -1]])
      .exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.bugModel.findOneAndUpdate(condition, fields, { new: true }).exec();
  }

  saveBug(Bug) {
    return Bug.save();
  }

  async create(fields) {
    return this.bugModel.create(fields);
  }
}

module.exports = BugRepository;
