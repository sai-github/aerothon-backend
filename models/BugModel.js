const mongoose = require('mongoose');

const BugSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  appName: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Bug', BugSchema);
