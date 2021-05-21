// Import Bot controllers
const AnnouncementController = require('./elements/announcementController');

class AnnouncementInterface {
  constructor(context) {
    this.announcementServices = new AnnouncementController(context);
  }
}

module.exports = AnnouncementInterface;
