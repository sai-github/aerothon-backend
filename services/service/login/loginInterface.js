// Import login controllers
const LoginController = require('./elements/loginController');

class LoginInterface {
  constructor(context) {
    this.email = new LoginController(context);
  }
}

module.exports = LoginInterface;
