const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const debug = require('debug')('chat:server');

const socketio = require('socket.io');

// linking up the route files
const routes = require('./routes/index');
const group = require('./routes/group');

// fire up the server
const app = express();
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/group', group);

const server = http.createServer(app);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:auth/chatter');

// tracks the users currently logged in
const userTracker = {};

socketio.listen(server).on('connection', (socket) => {
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });

  socket.on('newgroup', () => {
    socket.broadcast.emit('newgroup', {});
  });

  socket.on('enter', (user) => {
    if (user && !userTracker[user.id]) {
      userTracker[user.id] = user;
    }
    socket.broadcast.emit('enter', userTracker);
    socket.emit('enter', userTracker);
  });

  socket.on('userleft', (user) => {
    if (user && userTracker[user.id]) {
      delete userTracker[user.id]
    }
    socket.broadcast.emit('userleft', userTracker);
  });

  socket.emit('enter', userTracker)
});

// formats/validates the port
function normalizePort(val) {
  var port = parseInt(val, 10);

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

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// cross-origins allowances
const permitCrossDomainRequests = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // some browsers send a pre-flight OPTIONS request to check if CORS is enabled so you have to also respond to that
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

// serves up the index.html entry point for all routes
app.get('*', (req, res) => {
  var indexPath = path.join(__dirname, 'views/index.html');
  res.sendFile(indexPath);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
      res.render(path.join('views/error.html'), {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(path.join(__dirname, 'views/error.html'));
  res.render(path.join(__dirname, 'views/error.html'), {
    message: err.message,
    error: {}
  });
});

module.exports = app;
