const mongoose = require('mongoose');
require('dotenv').config();

const logger = require('../logger/logger');

const MONGOURI = process.env.MONGO_URL;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    mongoose.set('debug', true);
    logger.info(':::::Connected to DB:::::');
  } catch (e) {
    logger.info(':::::Failed to connect to DB:::::');
  }
};

module.exports = { InitiateMongoServer, mongoose };
