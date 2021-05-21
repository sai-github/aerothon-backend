const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();
const ServiceManager = require('../../services/serviceManager');
const AuthenticateRequest = require('../../middlewares/authenticateRequest');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const storagePath = path.join(__dirname, '..', '..', 'images', 'bugs');
    callback(null, storagePath);
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/\//g, '').replace(/\\/g, '').replace(/[\s+]/g, '-'));
  }
});

const upload = multer({ storage });

const BUG = {
  listBug: '/listbug',
  saveUpdateBug: '/savebug'
};

/**
 * API to List All bugs
 */
router.get(BUG.listBug, AuthenticateRequest.authenticate(), (req, res, next) => {
  new ServiceManager({ req, res, next }).bug.bugServices.getAllBugs();
});

/**
 * API to create bug
 */
router.post(BUG.saveUpdateBug, AuthenticateRequest.authenticate(), upload.single('bug'), (req, res, next) => {
  new ServiceManager({ req, res, next }).bug.bugServices.saveBug();
});

module.exports = router;
