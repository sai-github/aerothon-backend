const BotService = require('./botService');
const BotValidator = require('./botValidator');

class BotController {
  constructor(context) {
    this.request = context.req;
    this.response = context.res;
    this.next = context.next;
    this.service = new BotService();
    //this.validator = new BotValidator();
  }

  async add() {
    try {
      const result = await this.service.add(this.request.body);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }

  async modify() {
    try {
      const result = await this.service.modify(this.request.params.id, this.request.body);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }

  async delete() {
    try {
      const result = await this.service.delete(this.request.params.id);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }

  async get() {
    try {
      const result = await this.service.getAll(this.request.query);
      this.response.send(result);
    } catch (err) {
      this.next(err);
    }
  }

}

module.exports = BotController;
