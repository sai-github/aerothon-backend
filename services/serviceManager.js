// import service interfaces to integrate with service manager
const Login = require('./service/login/loginInterface');
const User = require('./service/user/userInterface');
const Faq = require('./service/faq/faqInterface');

// Service Manager
class ServiceManager {
  constructor(context) {
    this.login = new Login(context);
    this.user = new User(context);
    this.faq = new Faq(context);
  }
}

module.exports = ServiceManager;
