// Import Bot controllers
const BotController = require('./elements/botController');

class BotInterface {
  constructor(context) {
    this.botServices = new BotController(context);
  }
}

module.exports = BotInterface;
