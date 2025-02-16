const OAuthClient = require("./src/OAuthClient");

module.exports = (clientId, clientSecret, redirectUri) => {
  return new OAuthClient(clientId, clientSecret, redirectUri);
};
