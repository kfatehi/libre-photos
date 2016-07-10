module.exports = function(libraryPath, serverConfig, callback) {
  var express = require('express');
  var PhotoLibrary = require('./photo-library');
  var pkg = require('../package');
  var app = express();
  var cors = require('cors');
  var server = require('http').Server(app);
  var io = require('socket.io').listen(server);
  var library = new PhotoLibrary(libraryPath);

  app.use(cors());

  app.use(express.static(__dirname+'/../client/dist'));

  app.get('/version', function(req, res, next) {
    res.send(pkg.version+'\n');
  });

  app.get('/masters(.json)?', function(req, res, next) {
    library.Master.findAll({
      limit: 10
    }).then(function(rows) {
      return res.json(rows);
    }).catch(next);
  });

  io.on('connection', function(socket) {
    library.Master.findAll({
      limit: 10
    }).then(function(rows) {
      socket.emit('action', {
        type: 'SET_PHOTOS',
        photos: rows
      })
    })
  });

  server.listen(serverConfig.port, function(err) {
    callback(err, Object.assign({}, serverConfig))
  });
}
