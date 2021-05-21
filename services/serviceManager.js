// import service interfaces to integrate with service manager
const Login = require('./service/login/loginInterface');
const User = require('./service/user/userInterface');
const Faq = require('./service/faq/faqInterface');
const Bug = require('./service/bug/bugInterface');
const Bot = require('./service/bot/botInterface');
const Announcement = require('./service/announcement/announcementInterface');
const SearchLink = require('./service/searchLink/searchLinkInterface');

// Service Manager
class ServiceManager {
  constructor(context) {
    this.login = new Login(context);
    this.user = new User(context);
    this.faq = new Faq(context);
    this.bug = new Bug(context);
    this.bot = new Bot(context);
    this.announcement = new Announcement(context);
    this.searchLink = new SearchLink(context);
  }
}

module.exports = ServiceManager;
