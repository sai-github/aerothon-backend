const Joi = require('joi');

const APImap = {
  login: 'loginApiSchema',
  logout: 'resetPasswordApiSchema',
  register: 'registerApiSchema'
};

class EmailLoginValidator {
  constructor() {
    this.loginApiSchema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
    });

    this.registerApiSchema = Joi.object({
      userFirstName: Joi.string(),
      userSecondName: Joi.string(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      phoneNumber: Joi.string().length(10).pattern(/^\d+$/).required()
    });

    this.logoutApiSchema = Joi.object({
      accessToken: Joi.object().required()
    });
  }

  validate(api, payload) {
    return this[APImap[api]].validateAsync(payload);
  }
}

module.exports = EmailLoginValidator;
