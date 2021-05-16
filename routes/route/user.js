const express = require('express');

const router = express.Router();
const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const USER = {
  listUser: '/listuser',
  userSaveUpdateService: '/saveUser'
};

/**
 * API to List All categories
 */
router.get(USER.listUser, AuthenticateRequest.authenticate(), (req, res, next) => {
  new ServiceManager({ req, res, next }).user.userServices.getAllCategories();
});

/**
 * API to create user
 */
// router.post(USER.userSaveUpdateService, AuthenticateRequest.authenticate(), (req, res, next) => {
//   new ServiceManager({ req, res, next }).user.userServices.saveUser();
// });

module.exports = router;
