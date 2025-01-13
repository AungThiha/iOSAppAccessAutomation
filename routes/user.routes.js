const verifyiOSAppInviteAlert = require("../middleware/verifyiOSAppInviteAlert");
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
      verifyiOSAppInviteAlert
    ],
    controller.newDevice
  );
};
