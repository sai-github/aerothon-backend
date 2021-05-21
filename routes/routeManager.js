/**
 * ROUTE MANAGER
 *
 * > purpose
 *   + to take routing load from app.js and manage all routes within application
 *
 */
const express = require('express');

const router = express.Router();

// stand alone routes imports
const ServerStatus = require('./route/index');
const LoginRoute = require('./route/login');
const UserRoute = require('./route/user');
const FaqRoute = require('./route/faq');
const BugRoute = require('./route/bug');
const BotRoute = require('./route/bot');

// stand alone route mappings defined below
router.use('/api/faq', FaqRoute);
router.use('/api/user', UserRoute);
router.use('/api/bug', BugRoute);
router.use('/api/bot', BotRoute);
router.use('/api', LoginRoute);
router.use('/', ServerStatus);

module.exports = router;
