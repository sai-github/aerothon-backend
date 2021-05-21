const jwt = require('jsonwebtoken');

const logger = require('../../../../commons/logger/logger');
const GeneralUtility = require('../../../../commons/util/generalUtility');
const BotRepository = require('./botRepository');

const messages = {
  BOT_CREATED: 'Bot added successfully',
  BOT_EXIST: 'Bot already present with appName',
  BOT_UPDATED: 'Bot Updated Successfully',
  BOT_DELETED: 'Bot Deleted Successfully'
};

class BotService {
  constructor() {
    this.log = logger;
    this.botRepository = new BotRepository();
  }

  async add(body) {
    const botExist = await this.botRepository.fetchBot({ appName: body.appName });
    if (botExist) {
      return {
        status : 'failed',
        statusCode: 400,
        message : messages.BOT_EXIST
      };
    }

    let botDetail = {
      email: body.email,
      appName: body.appName,
      botToken: body.botToken
    };

    const result = await this.botRepository.create(botDetail);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.BOT_CREATED,
      data: result
    };
  }

  async modify(id, body) {

    let botDetail = {
      email: body.email,
      appName: body.appName,
      botToken: body.botToken
    };

    const result = await this.botRepository.fetchAndUpdate({_id: id}, botDetail);

    return {
      status: 'success',
      statusCode: 200,
      message: messages.BOT_UPDATED,
      data: result
    };
  }

  async delete(id) {
    const result = await this.botRepository.deleteBot({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      message: messages.BOT_DELETED,
      data: result
    };
  }

  async get(id) {
    const result = await this.botRepository.fetchBot({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

  async getAll(condition) {
    const result = await this.botRepository.fetchAllBot(condition);

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

}

module.exports = BotService;
