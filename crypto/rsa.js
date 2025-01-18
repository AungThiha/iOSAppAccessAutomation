const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

function removeBearer(token) {
  if (typeof token !== "string") {
    return null;
  }
  return token.startsWith("Bearer ") ? token.slice(7) : null;
}

const catchError = (err, res, genericErrorMessage) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: "Unauthorized! Access Token was expired!",
    });
  }

  return res.status(401).json({
    message: genericErrorMessage,
  });
};

const createVerifyJWTMiddleware = (
  publicKeyBase64,
  missingTokenMessage,
  invalidTokenMessage,
) => {
  return (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    const token = removeBearer(bearerToken);

    if (!token) {
      return res.status(403).send({
        message: missingTokenMessage,
      });
    }

    const publicKey = Buffer.from(publicKeyBase64, "base64");

    jwt.verify(token, publicKey, (err) => {
      if (err) {
        return catchError(err, res, invalidTokenMessage);
      }

      next();
    });
  };
};

module.exports = { createVerifyJWTMiddleware };
