const logger = require('../../../../commons/logger/logger');
const BugRepository = require('./bugRepository');

const messages = {
  BUG_DETAILS_FETCH_SUCCESS: 'Bug details fetched successfully',
  BUG_CREATE_SUCCESS: 'Bug created successfully',
  BUG_UPDATED: 'Bug Updated Successfully'
};

class BugService {
  constructor() {
    this.log = logger;
    this.bugRepository = new BugRepository();
  }

  async fetchBug(condition) {
    const bugData = await this.bugRepository.fetchBug(condition);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.BUG_DETAILS_FETCH_SUCCESS,
      data: bugData
    };
  }

  async saveBug(fields) {
    const bugData = await this.bugRepository.create(fields);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.BUG_CREATE_SUCCESS,
      data: bugData
    };
  }

  async modify(id, body) {
    let bugDetail = {
      isActiveBug: body.isActiveBug
    };

    const result = await this.bugRepository.fetchAndUpdate({ _id: id }, bugDetail);

    return {
      status: 'success',
      statusCode: 200,
      message: messages.BUG_UPDATED,
      data: result
    };
  }
}

module.exports = BugService;
