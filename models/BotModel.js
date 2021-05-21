const mongoose = require('mongoose');

const BotSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  appName: {
    type: String,
    required: true
  },
  botToken: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Bot', BotSchema);
