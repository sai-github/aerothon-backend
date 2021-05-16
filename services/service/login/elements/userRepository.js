const mongoose = require('mongoose');

const User = require('../../../../models/UserModel');

class UserRepository {
  constructor() {
    this.userModel = User;
  }

  fetchUser(condition = {}) {
    return this.userModel.findOne(condition).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.userModel.findOneAndUpdate(condition, fields).exec();
  }

  // eslint-disable-next-line class-methods-use-this
  saveUser(user) {
    return user.save();
  }

  create(user) {
    // eslint-disable-next-line new-cap
    let userModel = new this.userModel();
    userModel = Object.assign(userModel, user);
    userModel._id = new mongoose.Types.ObjectId().toHexString();
    return userModel.save();
  }
}

module.exports = UserRepository;
