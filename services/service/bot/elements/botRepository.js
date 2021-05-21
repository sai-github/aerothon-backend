const mongoose = require('mongoose');

const Bot = require('../../../../models/BotModel');

class BotRepository {
  constructor() {
    this.botModel = Bot;
  }

  fetchBot(condition = {}) {
    return this.botModel.findOne(condition).exec();
  }

  fetchAllBot(condition = {}) {
    return this.botModel.find(condition).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.botModel.findOneAndUpdate(condition, fields, {new: true}).exec();
  }

  // eslint-disable-next-line class-methods-use-this
  saveUser(bot) {
    return bot.save();
  }

  create(bot) {
    // eslint-disable-next-line new-cap
    let botModel = new this.botModel();
    botModel = Object.assign(botModel, bot);
    botModel._id = new mongoose.Types.ObjectId().toHexString();
    return botModel.save();
  }

  deleteBot(condition){
    return this.botModel.findByIdAndRemove(condition).exec();
  }
}

module.exports = BotRepository;
