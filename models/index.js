const Sequelize = require("sequelize");

let sequelize;

if (process.argv.includes("release") || process.env.NODE_ENV === "release") {
  // Release configuration
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
} else {
  // Debug configuration
  const config = require("../config/db.config.js");
  sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.device = require("../models/device.model.js")(sequelize, Sequelize);

db.device.belongsTo(db.user, {
  foreignKey: 'email', targetKey: 'email'
});
db.user.hasMany(db.device, {
  foreignKey: 'email', targetKey: 'email'
});

module.exports = db;
