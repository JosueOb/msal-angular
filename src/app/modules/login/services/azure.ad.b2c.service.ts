import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser';
import { AccountInfo } from '@azure/msal-browser';
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
    },
    cache: {
      cacheLocation: 'localStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };

  loginRequest = {
    scopes: SCOPES,
  };

  msalInstance = new msal.PublicClientApplication(this.msalConfig);

  signIn(): Observable<any> {
    return from(this.msalInstance.loginPopup());
  }
}
