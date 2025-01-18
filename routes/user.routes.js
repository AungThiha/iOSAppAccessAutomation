const verifyiOSAppInviteAlertJWT = require("../middleware/verifyiOSAppInviteAlertJWT");
const verifyiOSGithubWorkflowJWT = require("../middleware/verifyiOSGithubWorkflowJWT");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/user/device",
    [
      verifyiOSAppInviteAlertJWT
    ],
    controller.newDevice
  );

  app.get(
    "/user/emails",
    [
      verifyiOSGithubWorkflowJWT
    ],
    controller.emails
  );
};
