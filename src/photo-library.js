var Sequelize = require('sequelize');
var resolve = require('path').resolve;

function PhotoLibrary(path) {
  var Library = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(path+'/database/Library.apdb')
  });

  var ImageProxies = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(path+'/database/ImageProxies.apdb')
  });

  this.Master = Library.define('Master', {
    modelId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    uti: Sequelize.STRING,
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
