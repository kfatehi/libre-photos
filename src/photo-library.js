var Sequelize = require('sequelize');
var resolve = require('path').resolve;
var fse = require('fs-extra');

function PhotoLibrary(path, opts) {

  var paths = {
    Library: resolve(path+'/database/Library.apdb'),
    ImageProxies: resolve(path+'/database/ImageProxies.apdb')
  }

  if (opts.copy) {
    console.log('making a local copy of database files...');
    fse.copySync(paths.Library, '/tmp/library.apdb')
    paths.Library = '/tmp/library.apdb';
    console.log('1/2');
    fse.copySync(paths.ImageProxies, '/tmp/imageproxies.apdb')
    paths.ImageProxies = '/tmp/imageproxies.apdb';
    console.log('2/2');
  }

  var Library = new Sequelize({
    dialect: 'sqlite',
    storage: paths.Library
  });

  var ImageProxies = new Sequelize({
    dialect: 'sqlite',
    storage: paths.ImageProxies
  });

  this._Library = Library;

  this.Master = Library.define('Master', {
    modelId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    UTI: Sequelize.STRING,
    imagePath: Sequelize.STRING,
    imageDate: Sequelize.DATE,
    imageTimeZoneOffsetSeconds: Sequelize.INTEGER
  }, {
    tableName: 'RKMaster',
    timestamps: false,
    underscored: false
  });

  this.ImageProxyState = ImageProxies.define('ImageProxyState', {
    modelId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    versionUuid: Sequelize.STRING,

    thumbnailPath: Sequelize.STRING,
    thumbnailHeight: Sequelize.INTEGER,
    thumbnailWidth: Sequelize.INTEGER,

    miniThumbnailPath: Sequelize.STRING,
    miniThumbnailHeight: Sequelize.INTEGER,
    miniThumbnailWidth: Sequelize.INTEGER,
  }, {
    tableName: 'RKImageProxyState',
    timestamps: false,
    underscored: false
  });
}

module.exports = PhotoLibrary;
