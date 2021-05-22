const mongoose = require('mongoose');

const SearchLinkSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  relativePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  appName: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('SearchLink', SearchLinkSchema);
