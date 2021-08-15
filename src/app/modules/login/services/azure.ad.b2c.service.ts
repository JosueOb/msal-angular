import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser';
import { from, Observable } from 'rxjs';
import { AUTHORITY, CLIENT_ID, SCOPES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureAdB2CService {
  constructor() {}

  msalConfig: any = {
    auth: {
      clientId: CLIENT_ID,
      authority: AUTHORITY,
      redirectUri: 'http://localhost:4200/',
      //postLogoutRedirectUri : 'http://localhost:4200/login'
    },
    cache: {
      cacheLocation: 'localStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };

  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  loginRequest = {
    scopes: SCOPES,
  };

  msalInstance = new msal.PublicClientApplication(this.msalConfig);

  signIn(): Observable<any> {
    return from(this.msalInstance.loginPopup(this.loginRequest));
  }

  logout() {
    this.msalInstance.logoutRedirect({
      onRedirectNavigate: (url) => {
        // Return false if you would like to stop navigation after local logout
        //console.log(url);
        return false;
      },
    });
  }

  isLogin() {
    return this.getAccount() ? true : false;
  }

  getAccount() {
    return this.msalInstance.getAllAccounts()[0];
  }
}
