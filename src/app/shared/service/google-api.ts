import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth-config';

@Injectable({
  providedIn: 'root',
})
export class GoogleApi {

  constructor(private oAuthService: OAuthService) { }

  getGoogleUser(): any {
    this.oAuthService.configure(authConfig);
    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginImplicitFlow().then(() => {
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow();
        } else {
          this.oAuthService.loadUserProfile().then(() => {
            console.log('User profile:', JSON.stringify(this.oAuthService.getIdentityClaims()));
            return this.oAuthService.getIdentityClaims();
          });
        }
      });
    });
  }
}
