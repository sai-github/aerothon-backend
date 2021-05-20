// Import Faq controllers
const FaqController = require('./elements/faqController');

class FaqInterface {
  constructor(context) {
    this.faqServices = new FaqController(context);
  }
}

module.exports = FaqInterface;
