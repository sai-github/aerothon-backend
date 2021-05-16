const logger = require('../../../../commons/logger/logger');
const UserRepository = require('./userRepository');

const messages = {
  USER_DETAILS_FETCH_SUCCESS: 'User details fetched successfully',
  USER_CREATE_SUCCESS: 'User created successfully'
};

class UserService {
  constructor() {
    this.log = logger;
    this.userRepository = new UserRepository();
  }

  async fetchUser(condition) {
    const userData = await this.userRepository.fetchUser(condition);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.USER_DETAILS_FETCH_SUCCESS,
      data: userData
    };
  }
}

module.exports = UserService;
