const UserService = require('./userService');
const UserValidator = require('./userValidator');

class UserController {
  constructor(context) {
    this.request = context.req;
    this.response = context.res;
    this.next = context.next;
    this.service = new UserService();
    this.validator = new UserValidator();
  }

  async getAllCategories() {
    try {
      const result = await this.service.fetchUser(this.request.query);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }
}

module.exports = UserController;
