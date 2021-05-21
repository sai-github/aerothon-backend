const express = require('express');

const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const router = express.Router();

// map apis to controllers
router.post('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).searchLink.searchLinkServices.add());
router.patch('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).searchLink.searchLinkServices.modify());
router.delete('/:id', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).searchLink.searchLinkServices.delete());
router.get('/', AuthenticateRequest.authenticate(), (req, res, next) => new ServiceManager({ req, res, next }).searchLink.searchLinkServices.get());

module.exports = router;
