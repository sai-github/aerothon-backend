const jwt = require('jsonwebtoken');

const logger = require('../../../../commons/logger/logger');
const GeneralUtility = require('../../../../commons/util/generalUtility');
const SearchLinkRepository = require('./searchLinkRepository');

const messages = {
  SEARCHLINK_CREATED: 'SearchLink added successfully',
  SEARCHLINK_EXIST: 'SearchLink already present with given title',
  SEARCHLINK_UPDATED: 'SearchLink Updated Successfully',
  SEARCHLINK_DELETED: 'SearchLink Deleted Successfully'
};

class SearchLinkService {
  constructor() {
    this.log = logger;
    this.searchLinkRepository = new SearchLinkRepository();
  }

  async add(body) {
    const searchLinkExist = await this.searchLinkRepository.fetchSearchLink({ title: body.title });
    if (searchLinkExist) {
      console.log("into fetch searchLink exist");
      return {
        status : 'failed',
        statusCode: 400,
        message : messages.SEARCHLINK_EXIST
      };
    }

    let searchLinkDetail = {
      title: body.title,
      relativePath: body.relativePath,
      description: body.description
    };

    if(body.appName){
      searchLinkDetail["appName"] = body.appName;
    }

    const result = await this.searchLinkRepository.create(searchLinkDetail);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.SEARCHLINK_CREATED,
      data: result
    };
  }

  async modify(id, body) {

    let searchLinkDetail = {
      title: body.title,
      relativePath: body.relativePath,
      description: body.description
    };

    if(body.appName){
      searchLinkDetail["appName"] = body.appName;
    }

    const result = await this.searchLinkRepository.fetchAndUpdate({_id: id}, searchLinkDetail);

    return {
      status: 'success',
      statusCode: 200,
      message: messages.SEARCHLINK_UPDATED,
      data: result
    };
  }

  async delete(id) {
    const result = await this.searchLinkRepository.deleteSearchLink({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      message: messages.SEARCHLINK_DELETED,
      data: result
    };
  }

  async get(id) {
    const result = await this.searchLinkRepository.fetchSearchLink({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

  async getAll(condition) {
    const result = await this.searchLinkRepository.fetchAllSearchLink(condition);

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

}

module.exports = SearchLinkService;
