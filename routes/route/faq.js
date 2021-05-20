const express = require('express');

const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const router = express.Router();

// map apis to controllers
router.post('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.add());
router.patch('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.modify());
router.delete('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.delete());
router.get('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.get());

module.exports = router;
