const express = require('express');

const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const router = express.Router();

// map apis to controllers

router.post('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).announcement.announcementServices.add());
router.patch('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).announcement.announcementServices.modify());
router.delete('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).announcement.announcementServices.delete());
router.get('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).announcement.announcementServices.get());
router.get('/activeAnnouncement', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).announcement.announcementServices.getActiveAnnouncements());

module.exports = router;
