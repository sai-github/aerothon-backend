const jwt = require('jsonwebtoken');

const logger = require('../../../../commons/logger/logger');
const GeneralUtility = require('../../../../commons/util/generalUtility');
const FaqRepository = require('./faqRepository');

const messages = {
  FAQ_CREATED: 'Faq added successfully',
  FAQ_EXIST: 'Faq already present with given question',
  FAQ_UPDATED: 'Faq Updated Successfully',
  FAQ_DELETED: 'Faq Deleted Successfully'
};

class FaqService {
  constructor() {
    this.log = logger;
    this.faqRepository = new FaqRepository();
  }

  async add(body) {
    const faqExist = await this.faqRepository.fetchFaq({ question: body.question });
    if (faqExist) {
      console.log("into fetch faq exist");
      return {
        status : 'failed',
        statusCode: 400,
        message : messages.FAQ_EXIST
      };
    }

    let faqDetail = {
      question: body.question,
      answer: body.answer,
      isActiveFaq: body.isActiveFaq,
      category: body.category
    };

    if(body.appName){
      faqDetail["appName"] = body.appName;
    }

    const result = await this.faqRepository.create(faqDetail);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.FAQ_CREATED,
      data: result
    };
  }

  async modify(id, body) {

    let faqDetail = {
      question: body.question,
      answer: body.answer,
      isActiveFaq: body.isActiveFaq,
      category: body.category
    };

    if(body.appName){
      faqDetail["appName"] = body.appName;
    }

    const result = await this.faqRepository.fetchAndUpdate({_id: id}, faqDetail);

    return {
      status: 'success',
      statusCode: 200,
      message: messages.FAQ_UPDATED,
      data: result
    };
  }

  async delete(id) {
    const result = await this.faqRepository.deleteFaq({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      message: messages.FAQ_DELETED,
      data: result
    };
  }

  async get(id) {
    const result = await this.faqRepository.fetchFaq({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

  async getAll(condition) {
    const result = await this.faqRepository.fetchAllFaq(condition);

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

}

module.exports = FaqService;
