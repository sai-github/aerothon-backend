// Node modules
const { URL } = require('url');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const saltRounds = 10;

class GeneralUtility {
  static makeAbsolute(relativeUrl, baseUrl) {
    const url = new URL(relativeUrl, baseUrl);
    return url.href;
  }

  static async hashPassword(valueForHash) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(valueForHash, salt);
  }

  static async checkPassword(plainPassword, hash) {
    if (plainPassword !== '' && hash !== '') {
      return await bcrypt.compare(plainPassword, hash);
    }
    return false;
  }
}

module.exports = GeneralUtility;
