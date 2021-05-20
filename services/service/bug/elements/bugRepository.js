const mongoose = require('mongoose');

const Bug = require('../../../../models/BugModel');

class BugRepository {
  constructor() {
    this.bugModel = Bug;
  }

  fetchBug(condition = {}) {
    return this.bugModel.find(condition).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.bugModel.findOneAndUpdate(condition, fields).exec();
  }

  saveBug(Bug) {
    return Bug.save();
  }

  async create(fields) {
    return this.bugModel.create(fields);
  }
}

module.exports = BugRepository;
