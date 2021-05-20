const mongoose = require('mongoose');

const Faq = require('../../../../models/FaqModel');

class FaqRepository {
  constructor() {
    this.faqModel = Faq;
  }

  fetchFaq(condition = {}) {
    return this.faqModel.findOne(condition).exec();
  }

  fetchAllFaq(condition = {}) {
    return this.faqModel.find(condition).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.faqModel.findOneAndUpdate(condition, fields, {new: true}).exec();
  }

  // eslint-disable-next-line class-methods-use-this
  saveUser(faq) {
    return faq.save();
  }

  create(faq) {
    // eslint-disable-next-line new-cap
    let faqModel = new this.faqModel();
    faqModel = Object.assign(faqModel, faq);
    faqModel._id = new mongoose.Types.ObjectId().toHexString();
    return faqModel.save();
  }

  deleteFaq(condition){
    return this.faqModel.findByIdAndRemove(condition).exec();
  }
}

module.exports = FaqRepository;
