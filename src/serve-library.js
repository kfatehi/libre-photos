module.exports = function(libraryPath, serverConfig, callback) {
  var express = require('express');
  var PhotoLibrary = require('./photo-library');
  var pkg = require('../package');
  var app = express();
  var cors = require('cors');
  var server = require('http').Server(app);
  var io = require('socket.io').listen(server);
  var library = new PhotoLibrary(libraryPath, serverConfig);
  var path = require('path');
  var distPath = path.join(__dirname,'..', 'client', 'dist');

  app.use(cors());

  app.use(express.static(distPath));

  app.use(require('connect-stream')());

  app.get('/version', function(req, res, next) {
    res.send(pkg.version+'\n');
  });

  app.get('/masters/:id', function(req, res, next) {
    library.Master.findOne({
      where: { modelId: req.params.id }
    }).then(function(row) {
      var filePath = path.resolve(path.join(libraryPath, 'Masters', row.imagePath));
      res.stream(filePath);
    }).catch(next);
  });

  app.get('/thumbnails/:id', function(req, res, next) {
    library.ImageProxyState.findOne({
      where: { modelId: req.params.id }
    }).then(function(row) {
      if (row) {
        res.sendFile(path.resolve(path.join(libraryPath, 'Thumbnails', row.miniThumbnailPath)));
      } else {
        res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'img', 'nothumb.png'));
      }
    }).catch(next);
  });

  app.get('/*', function(req, res, next) {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  io.on('connection', function(socket) {
    library.Master.findAll({
      order: [['imageDate', 'DESC']]
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
