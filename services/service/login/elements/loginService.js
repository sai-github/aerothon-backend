const jwt = require('jsonwebtoken');

const logger = require('../../../../commons/logger/logger');
const GeneralUtility = require('../../../../commons/util/generalUtility');
const UserRepository = require('./userRepository');

const messages = {
  USER_NOT_FOUND: 'User not found',
  USER_SIGN_IN_ERROR: 'Failed to sign in user',
  INVALID_PWD: 'Invalid Password',
  PWD_UPDATE_FAILURE: 'Failed to update the password',
  USER_VALIDATED: 'User validated successfully',
  USER_PWD_UPDATED: 'User password updated successfully',
  USER_CREATED: 'User created successfully'
};

class EmailLoginService {
  constructor() {
    this.log = logger;
    this.userRepository = new UserRepository();
  }

  async login({ email, password }) {
    const responseTemplate = {
      status: 'failure',
      statusCode: 422,
      message: messages.USER_NOT_FOUND
    };

    try {
      this.log.info(`:::::Fetching user details::::: ${email}`);
      const user = await this.userRepository.fetchUser({ email: email });
      if (!user) {
        return responseTemplate;
      }

      const checkPass = await GeneralUtility.checkPassword(password, user.password);
      if (!checkPass) {
        return Object.assign(responseTemplate, { message: messages.INVALID_PWD });
      }

      await this.updateLastLogin(user);

      this.log.info(`:::::User Validated::::: ${user._id}`);

      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET);

      return {
        status: 'success',
        statusCode: 200,
        message: messages.USER_VALIDATED,
        token: token,
        data: { userFirstName: user.userFirstName, email: user.email }
      };
    } catch (err) {
      this.log.error(':::::Login failure:::::', err);
      return Object.assign(responseTemplate, { message: messages.USER_SIGN_IN_ERROR });
    }
  }

  async register(body) {
    const emailExist = await this.userRepository.fetchUser({ email: body.email });
    if (emailExist) {
      return res.status(400).send('User already registered with given email');
    }
    const hashedPassword = await GeneralUtility.hashPassword(body.password);
    let userDetail = {
      userFirstName: body.userFirstName,
      userSecondName: body.userSecondName,
      phoneNumber: body.phoneNumber,
      email: body.email,
      password: hashedPassword
    };

    const result = await this.userRepository.create(userDetail);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.USER_CREATED,
      data: result
    };
  }

  async updateLastLogin(user) {
    this.log.info(`:::::Updating user last login time::::: ${user._id}`);

    const loginObj = {
      login_channel: 'password',
      login_date: new Date(),
      status: 'success'
    };

    user.login.push(loginObj);

    await this.userRepository.saveUser(user);
  }

  async resetPassword({ accountId, password }) {
    const responseTemplate = {
      status: 'failure',
      statusCode: 422,
      message: messages.USER_NOT_FOUND
    };

    try {
      this.log.info(`:::::Fetching user account details::::: ${accountId}`);
      const user = await this.userRepository.fetchUser({ _id: accountId });

      if (!user) {
        return responseTemplate;
      }

      user.password = GeneralUtility.hashPassword(password);
      user.updatedAt = new Date();

      await this.userRepository.saveUser(user);

      return {
        status: 'success',
        statusCode: 200,
        message: messages.USER_PWD_UPDATED
      };
    } catch (err) {
      this.log.error(':::::Failed to update user password:::::', err);
      return Object.assign(responseTemplate, { message: messages.PWD_UPDATE_FAILURE });
    }
  }
}

module.exports = EmailLoginService;
