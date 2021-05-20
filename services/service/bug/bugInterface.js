// Import Bug controllers
const BugController = require('./elements/bugController');

class BugInterface {
  constructor(context) {
    this.bugServices = new BugController(context);
  }
}

module.exports = BugInterface;
