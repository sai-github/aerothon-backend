const mongoose = require('mongoose');

const FaqSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.Now
  },
  isActiveFaq: {
    type: Boolean,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  appName: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Faq', FaqSchema);
