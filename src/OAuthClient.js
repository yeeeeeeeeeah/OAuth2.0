const axios = require("axios");
require("dotenv").config();

class OAuthClient {
  constructor(clientId, clientSecret, redirectUri) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.oauthServer = "";
  }

  getAuthUrl() {
    return `${this.oauthServer}/auth/login?client_id=${this.clientId}&redirect_uri=${this.redirectUri}`;
  }

  // Função para trocar o código de autorização por tokens
  async exchangeCodeForToken(code) {
    try {
      const response = await axios.post(`${this.oauthServer}/oauth/token`, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      });

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao trocar código por token: ${error.response ? error.response.data.error : error.message}`);
    }
  }
}

module.exports = OAuthClient;
