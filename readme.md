# Yeah OAuth Library

This NPM package simplifies the implementation of the OAuth 2.0 flow for the **Yeah** music platform, providing an easy way to generate the authorization URL and exchange the authorization code for access and refresh tokens.

## Installation

To install the package, run the command:

```bash
npm install yeah-oauth
```

## Setup

After installation, you can use the `OAuthClient` class to simplify the OAuth authentication process with the **Yeah** platform.

### Dependencies

- **axios**: For making HTTP requests.
- **dotenv**: To load environment variables (in case you want to store sensitive information like `client_id` and `client_secret` in `.env` files).

## Usage

### Step 1: Generate the App ID and Secret

Before using the package, you need to access the **Yeah** platform to generate the **clientId** and **clientSecret** for your application. This can be done at:

[**Developers Yeah**](https://...)

After registering your app on the **Yeah** platform, you'll receive the **clientId** and **clientSecret**, which are necessary for OAuth authentication.

### Step 2: Initialize the OAuth Client

Create an instance of the `OAuthClient` class, passing the `clientId`, `clientSecret`, `redirectUri`, and the OAuth server URL.

```javascript
const OAuthClient = require("yeah-oauth");

const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";
const REDIRECT_URI = "http://localhost:4000/callback";

// Instantiate the OAuth client
const oauth = new OAuthClient(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
```

### Step 3: Generate the Authorization URL

Use the `getAuthUrl` method to generate the authorization URL where the user will be redirected to log in.

```javascript
const authUrl = oauth.getAuthUrl();
console.log(`Visit this URL to log in: ${authUrl}`);
```

### Step 4: Receive the Authorization Code

After logging in, the user will be redirected to the `redirectUri` you provided, with an authorization code in the URL.

Example of a redirect URL:

```
http://localhost:4000/callback?code=authorization-code
```

### Step 5: Exchange the Code for Tokens

After receiving the authorization code, you can use it to exchange for an access token and refresh token with the `exchangeCodeForToken` method.

```javascript
const authorizationCode = "authorization-code-received-in-url";  // This code comes in the callback URL

// Exchange the code for tokens
oauth.exchangeCodeForToken(authorizationCode)
  .then((tokens) => {
    console.log("Access Token:", tokens.accessToken);
    console.log("Refresh Token:", tokens.refreshToken);
  })
  .catch((error) => {
    console.error("Error exchanging code for token:", error.message);
  });
```

## API

### `OAuthClient`

#### `new OAuthClient(clientId, clientSecret, redirectUri)`

- **clientId** (String): The `client_id` provided by the OAuth server.
- **clientSecret** (String): The `client_secret` provided by the OAuth server.
- **redirectUri** (String): The URL where the OAuth server will redirect the user after login.

#### `oauthClient.getAuthUrl()`

Generates the authorization URL for the user to log in.

- **Return**: An authorization URL.

#### `oauthClient.exchangeCodeForToken(code)`

Exchanges the authorization code for an access token and refresh token.

- **code** (String): The authorization code received in the redirect URL.
- **Return**: A promise that resolves with an object containing the `accessToken` and `refreshToken`.

## License

MIT
