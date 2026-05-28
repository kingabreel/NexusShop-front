import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '254219924369-33sqievv05df188mipjrq57n6pc1fj41.apps.googleusercontent.com',
  redirectUri: window.location.origin + "/auth",
  responseType: 'token id_token',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: true
};
