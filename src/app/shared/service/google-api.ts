import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth-config';

@Injectable({
  providedIn: 'root',
})
export class GoogleApi {

  constructor(private oAuthService: OAuthService) { }

  initGoogleLogin() {

    this.oAuthService.configure(authConfig);

    this.oAuthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {

        if (!this.oAuthService.hasValidAccessToken()) {

          this.oAuthService.initCodeFlow();
        }
      });
  }

  async handleGoogleCallback() {

    this.oAuthService.configure(authConfig);

    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    if (this.oAuthService.hasValidAccessToken()) {

      return {
        idToken: this.oAuthService.getIdToken(),
        profile: this.oAuthService.getIdentityClaims()
      };
    }
    return null;
  }
}
