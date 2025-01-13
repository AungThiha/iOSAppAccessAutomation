/* 
This is used locally
Setup for Heroku can be found in /models/index.js
*/
module.exports = {
  HOST: "localhost",
  USER: "kmp",
  PASSWORD: "password",
  DB: "ios_app_access_automation",
  PORT: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    // The maximum time, in milliseconds, that pool will try to get connection before throwing error
    acquire: 30000,
    // The maximum time, in milliseconds, that a connection can be idle before being released.
    idle: 10000
  }
};
