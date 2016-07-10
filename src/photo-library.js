var Sequelize = require('sequelize');
var resolve = require('path').resolve;

function PhotoLibrary(path) {
  var sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: resolve(path+'/database/Library.apdb')
  });

  this.Master = sequelize.define('Master', {
    uuid: {
      type: Sequelize.UUID,
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
}

module.exports = PhotoLibrary;
