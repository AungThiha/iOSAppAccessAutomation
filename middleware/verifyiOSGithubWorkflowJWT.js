const { createVerifyJWTMiddleware } = require("../crypto/rsa");

const verifyiOSGithubWorkflowJWT = createVerifyJWTMiddleware(
  process.env.IOS_GITHUB_WORKFLOW_PUBLIC_KEY_BASE64,
  "No token provided! This endpoint accepts requests only from a specific Github Workflow. For more information -> https://aungthiha.github.io/iOSAppAccessAutomation/",
  "This endpoint accepts requests only from a specific Github Workflow. For more information -> https://aungthiha.github.io/iOSAppAccessAutomation/"
);

module.exports = verifyiOSGithubWorkflowJWT;
