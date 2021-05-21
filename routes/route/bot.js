const express = require('express');

const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const router = express.Router();

// map apis to controllers

router.post('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).bot.botServices.add());
router.patch('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).bot.botServices.modify());
router.delete('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).bot.botServices.delete());
router.get('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).bot.botServices.get());


module.exports = router;
