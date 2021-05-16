const winston = require('winston');
const moment = require('moment');

const errorLogFilename = `./logs/${process.env.FILE_ERR_LOG}`;
const devLogFilename = `./logs/${process.env.FILE_DEV_LOG}`;

// eslint-disable-next-line no-nested-ternary
const simplifyInfoLevel = (t) => (/^.*[dD][eE][bB][uU][gG].*$/.test(t) ? 'DEBUG' : /^.*[iI][nN][fF][oO].*$/.test(t) ? 'INFO' : /^.*[eE][rR][rR][oO][rR].*$/.test(t) ? 'ERROR' : '_LOG_');

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${moment(info.timestamp).format(process.env.DATE_FORMAT)} | ${simplifyInfoLevel(info.level)}  \t=> ${info.message}`),
);

const logger = winston.createLogger({
  level: 'debug',
  format: logFormat,
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: errorLogFilename, level: 'error', format: logFormat }),
    new winston.transports.File({ filename: devLogFilename, format: logFormat }),
  ],
});

if (process.env.ENVIRONMENT !== 'production') {
  logger.add(new winston.transports.Console({
    format: logFormat,
  }));
}

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write(message) {
    // use the 'info' log level so the output will be picked up by both transports(file and console)
    logger.info(message);
  },
};

module.exports = logger;
