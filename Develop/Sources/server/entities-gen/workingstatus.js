/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workingstatus', { 
    statusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusname: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
