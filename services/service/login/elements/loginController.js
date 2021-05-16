const EmailLoginService = require('./loginService');
const EmailLoginValidator = require('./loginValidator');

class EmailLoginController {
  constructor(context) {
    this.request = context.req;
    this.response = context.res;
    this.next = context.next;
    this.service = new EmailLoginService();
    this.validator = new EmailLoginValidator();
  }

  async login() {
    try {
      const validatedRequest = await this.validator.validate('login', this.request.body);
      const result = await this.service.login(validatedRequest);
      this.response
        .header('Authorization', result.token)
        .status(result.statusCode || 500)
        .send(result);
    } catch (err) {
      this.next(err);
    }
  }

  async register() {
    try {
      const validatedRequest = await this.validator.validate('register', this.request.body);
      const result = await this.service.register(validatedRequest);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }

  async resetPassword() {
    try {
      const validatedRequest = await this.validator.validate('resetPassword', this.request.body);
      const result = await this.service.resetPassword(validatedRequest);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }

  async logout() {
    try {
      let result = {};
      try {
        this.request.logout();
        result = {
          status: 'success',
          statusCode: 200,
          message: messages.USER_INVALIDATED
        };
      } catch (err) {
        result = {
          status: 'failure',
          statusCode: 422,
          message: messages.LOGOUT_FAILURE
        };
      }
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }
}

module.exports = EmailLoginController;
