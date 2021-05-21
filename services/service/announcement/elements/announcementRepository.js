const mongoose = require('mongoose');

const Announcement = require('../../../../models/AnnouncementModel');

class AnnouncementRepository {
  constructor() {
    this.announcementModel = Announcement;
  }

  fetchAnnouncement(condition = {}) {
    return this.announcementModel.findOne(condition).exec();
  }

  fetchAllAnnouncement(condition = {}) {
    return this.announcementModel.find(condition).exec();
  }

  fetchAndUpdate(condition, fields) {
    return this.announcementModel.findOneAndUpdate(condition, fields, {new: true}).exec();
  }

  // eslint-disable-next-line class-methods-use-this
  saveUser(announcement) {
    return announcement.save();
  }

  create(announcement) {
    // eslint-disable-next-line new-cap
    let announcementModel = new this.announcementModel();
    announcementModel = Object.assign(announcementModel, announcement);
    announcementModel._id = new mongoose.Types.ObjectId().toHexString();
    return announcementModel.save();
  }

  deleteAnnouncement(condition){
    return this.announcementModel.findByIdAndRemove(condition).exec();
  }
}

module.exports = AnnouncementRepository;
