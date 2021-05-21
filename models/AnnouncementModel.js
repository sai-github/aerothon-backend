const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  activeFrom: {
    type: Date,
    default: Date.now
  },
  activeTill: {
    type: Date,
    default: Date.now
  },
  appName: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);
