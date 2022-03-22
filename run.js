#!/usr/bin/env node

const colors = require('colors');

//  check for environment constiables
const REQUIRED_ENV_VARS = [
      'PORT',
      'ALLOWED_ORIGIN'
    ]

REQUIRED_ENV_VARS.forEach((envVar)=>{
  if(!process.env[envVar]){
    console.log(`Environment variable ${envVar} is expected to
       run the application.  If no longer needed, please remove it
       from the applciation and from run.js`.yellow
     );
    process.exit();
  }
})


/**
 * Module dependencies.
 */

const app = require('./app');
const debug = require('debug')('lazy express api');
const http = require('http');


/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

let host = process.env.SETTING == "PRODUCTION" ? '0.0.0.0' : '127.0.0.1';
//let host =  '127.0.0.1';

server.listen(port, host);
console.log(`attempting to start lazy express api on ${host}:${port}`);

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    console.log(`isNan ${port}`)
    return val;
  }

  if (port >= 0) {
    // port number
    console.log(`port >= 0 ${port}`)
    return port;
  }
  console.log(`no port? val = ${val}`)
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      const addr = server.address();
      console.error(bind + ' requires elevated privileges');
      console.log(addr);
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
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log(addr);
  debug('Listening on ' + bind);
}
