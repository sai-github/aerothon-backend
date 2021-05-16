const express = require('express');

const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const router = express.Router();

// map apis to controllers
router.post('/login', (req, res, next) => new ServiceManager({ req, res, next }).login.email.login());
router.post('/register', (req, res, next) => new ServiceManager({ req, res, next }).login.email.register());
router.post('/logout', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).login.email.logout());

module.exports = router;
