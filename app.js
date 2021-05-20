#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();
const appLog = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');

const logger = require('./commons/logger/logger');
const RouteManager = require('./routes/routeManager');
const { InitiateMongoServer } = require('./commons/config/db');

const app = express();

app.use(cors());
InitiateMongoServer();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  appLog('common', {
    stream: fs.createWriteStream(`./logs/${process.env.FILE_APP_LOG}`, { flags: 'a' })
  })
);

app.use(appLog('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/bugimages', express.static(`${__dirname}/images/bugs`));
// route manager : all api routes defined
app.use('/', RouteManager);

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error(err);
  console.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message ? err.message : JSON.stringify(err);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const errorBody = {
    message: err.message ? err.message : JSON.stringify(err),
    error: req.app.get('env') === 'development' ? err : {},
    status: err.status || 500
  };

  res.status(err.status || 500);
  res.send(errorBody);
});

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = {};

/**
 * Create HTTP server.
 */
server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

module.exports = app;
