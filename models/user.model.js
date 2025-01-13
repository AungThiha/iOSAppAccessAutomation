module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    }
  });

  return user;
};
