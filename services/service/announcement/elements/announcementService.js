const jwt = require('jsonwebtoken');
const moment = require('moment');

const logger = require('../../../../commons/logger/logger');
const GeneralUtility = require('../../../../commons/util/generalUtility');
const AnnouncementRepository = require('./announcementRepository');

const messages = {
  ANNOUNCEMENT_CREATED: 'Announcement added successfully',
  ANNOUNCEMENT_EXIST: 'Announcement already present',
  ANNOUNCEMENT_UPDATED: 'Announcement Updated Successfully',
  ANNOUNCEMENT_DELETED: 'Announcement Deleted Successfully'
};

class AnnouncementService {
  constructor() {
    this.log = logger;
    this.announcementRepository = new AnnouncementRepository();
  }

  async add(body) {
    const announcementExist = await this.announcementRepository.fetchAnnouncement({ message: body.message });
    if (announcementExist) {
      return {
        status : 'failed',
        statusCode: 400,
        message : messages.ANNOUNCEMENT_EXIST
      };
    }

    let announcementDetail = {
      message: body.message,
      activeFrom: moment(body.activeFrom),
      activeTill: moment(body.activeTill)
    };

    if(body.appName){
      announcementDetail["appName"] = body.appName;
    }

    const result = await this.announcementRepository.create(announcementDetail);
    return {
      status: 'success',
      statusCode: 200,
      message: messages.ANNOUNCEMENT_CREATED,
      data: result
    };
  }

  async modify(id, body) {

    let announcementDetail = {
      message: body.message,
      activeFrom: moment(body.activeFrom),
      activeTill: moment(body.activeTill)
    };

    if(body.appName){
      announcementDetail["appName"] = body.appName;
    }

    const result = await this.announcementRepository.fetchAndUpdate({_id: id}, announcementDetail);

    return {
      status: 'success',
      statusCode: 200,
      message: messages.ANNOUNCEMENT_UPDATED,
      data: result
    };
  }

  async delete(id) {
    const result = await this.announcementRepository.deleteAnnouncement({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      message: messages.ANNOUNCEMENT_DELETED,
      data: result
    };
  }

  async get(id) {
    const result = await this.announcementRepository.fetchAnnouncement({_id: id});

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

  async getAll(condition) {
    const result = await this.announcementRepository.fetchAllAnnouncement(condition);

    return {
      status: 'success',
      statusCode: 200,
      data: result
    };
  }

  async getActiveAnnouncements(condition) {
    const result = await this.announcementRepository.fetchAllAnnouncement(condition);
    // filter active announcements
    var now = moment();
    var activeAnnouncements = result.filter( function(result){
        //console.log(now.diff(moment(result.activeTill)), "11111", now.diff(moment(result.activeFrom)));
        return (now.diff(moment(result.activeTill)) <= 0 && now.diff(moment(result.activeFrom)) >= 0);
      });

    return {
      status: 'success',
      statusCode: 200,
      data: activeAnnouncements
    };
  }

}

module.exports = AnnouncementService;
