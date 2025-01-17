const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

function removeBearer(token) {
  if (typeof token !== 'string') {
    return null;
  }
  return token.startsWith("Bearer ") ? token.slice(7) : null;
}

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send(
      { message: "Unauthorized! Access Token was expired!" }
    );
  }

  return res.status(401).json(
    {
      message: "This endpoint accepts requests only from iOSAppInviteAlert. For more information -> https://aungthiha.github.io/iOSAppAccessAutomation/"
    }
  );
}

const verifyiOSAppInviteAlertJWT = (req, res, next) => {

  let bearerToken = req.headers["authorization"];
  let token = removeBearer(bearerToken);

  if (!token) {
    return res.status(403).send({
      message: "No token provided! This endpoint accepts requests only from iOSAppInviteAlert. For more information -> https://aungthiha.github.io/iOSAppAccessAutomation/"
    });
  }

  let base64PublicKey = process.env.IOS_APP_INVITE_ALERT_PUBLIC_KEY_BASE64
  let publicKey = Buffer.from(base64PublicKey, 'base64')

  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }

    next();
  });
};

module.exports = verifyiOSAppInviteAlertJWT;