const express = require('express');

const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const router = express.Router();

// map apis to controllers
router.post('/add', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.add());
router.patch('/modify/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.modify());
router.delete('/delete/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.delete());

router.get('/get/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.get());
router.get('/getAll', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).faq.faqServices.getAll());

module.exports = router;
