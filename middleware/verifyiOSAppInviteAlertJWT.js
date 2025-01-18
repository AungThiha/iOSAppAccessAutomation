const { createVerifyJWTMiddleware } = require("../crypto/rsa");

const verifyiOSAppInviteAlertJWT = createVerifyJWTMiddleware(
  process.env.IOS_APP_INVITE_ALERT_PUBLIC_KEY_BASE64,
  "No token provided! This endpoint accepts requests only from iOSAppInviteAlert. For more information -> https://aungthiha.github.io/iOSAppAccessAutomation/",
  "This endpoint accepts requests only from iOSAppInviteAlert. For more information -> https://aungthiha.github.io/iOSAppAccessAutomation/",
);

module.exports = verifyiOSAppInviteAlertJWT;
