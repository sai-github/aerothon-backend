const mongoose = require('mongoose');

const User = require('../../../../models/UserModel');

const fieldsToDisplay = {
  userFirstName: 1,
  userSecondName: 1,
  phoneNumber: 1,
  email: 1
};

class UserRepository {
  constructor() {
    this.userModel = User;
  }

  fetchUser(condition = {}) {
    return this.userModel.find(condition, fieldsToDisplay).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.userModel.findOneAndUpdate(condition, fields).exec();
  }

  saveUser(user) {
    return user.save();
  }

  create(user) {
    let userModel = new this.userModel();
    userModel = Object.assign(userModel, user);
    userModel._id = new mongoose.Types.ObjectId().toHexString();
    return userModel.save();
  }
}

module.exports = UserRepository;
