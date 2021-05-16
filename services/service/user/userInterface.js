// Import User controllers
const UserController = require('./elements/userController');

class UserInterface {
  constructor(context) {
    this.userServices = new UserController(context);
  }
}

module.exports = UserInterface;
