module.exports = (sequelize, Sequelize) => {
  const device = sequelize.define("device", {
    udid: {
      type: Sequelize.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    device_model: {
      type: Sequelize.STRING(100),
      allowNull: false,
    }
  });

  return device;
};
