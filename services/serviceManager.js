// import service interfaces to integrate with service manager
const Login = require('./service/login/loginInterface');
const User = require('./service/user/userInterface');

// Service Manager
class ServiceManager {
  constructor(context) {
    this.login = new Login(context);
    this.user = new User(context);
  }
}

module.exports = ServiceManager;
