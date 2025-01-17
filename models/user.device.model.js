module.exports = (sequelize, Sequelize) => {
  const UserDevice = sequelize.define("UserDevice", {
    user_email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'email'
      }
    },
    device_udid: {
      type: Sequelize.STRING(100),
      primaryKey: true,
      references: {
        model: 'device',
        key: 'udid'
      }
    }
  }, {
    tableName: 'user_device'
  });

  return UserDevice;
};
