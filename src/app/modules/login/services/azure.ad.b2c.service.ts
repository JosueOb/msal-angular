import { Injectable, OnInit } from '@angular/core';
import {
  AccountInfo,
  AuthenticationResult,
  Configuration,
  PopupRequest,
  PublicClientApplication,
  SilentRequest,
} from '@azure/msal-browser';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AUTHORITY, CLIENT_ID, SCOPES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureAdB2CService {
  private msalConfig: Configuration = {
    //Auth config options
    auth: {
      clientId: CLIENT_ID, //App ID of your application
      authority: AUTHORITY, //URI of the tenant to authenticate and authorize with. Usually takes the form of https://{uri}/{tenantid}
      redirectUri: 'http://localhost:4200', //URI where the authorization code response is sent back to.
    },
    //Cache config options
    cache: {
      cacheLocation: 'localStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };

  private msalInstance: PublicClientApplication;
  private account: AccountInfo | null;
  private loginRequest: PopupRequest;
  private silentTokenRequest: SilentRequest;

  constructor() {
    this.msalInstance = new PublicClientApplication(this.msalConfig);
    this.account = null;

    this.loginRequest = {
      scopes: SCOPES, // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
    };

    this.silentTokenRequest = {
      scopes: ['User.Read'], // Add scopes here for access token to be used at Microsoft Graph API endpoints.
      forceRefresh: false, // Set this to "true" to skip a cached token and go to the server to get a new token
    };

    if (this.isLogin()) {
      this.account = this.getAccount();
    } else {
      this.account = null;
    }
  }

  /**
   * Calls getAllAccounts and determines the correct account to sign into, currently defaults to first account found in cache.
   * TODO: Add account chooser code
   */
  getAccount(): AccountInfo | null {
    const currentAccounts = this.msalInstance.getAllAccounts();

    if (currentAccounts === null) {
      console.log('No accounts detected');
      return null;
    }
    if (currentAccounts.length > 1) {
      //Add chose account code here
      console.log(
        'Multiple accounts detected, need to add chose account code.'
      );
      return currentAccounts[0];
    } else if (currentAccounts.length === 1) {
      return currentAccounts[0];
    }
    return null;
  }

  /**
   * Handles the response from a popup or redirect. If response is null, will check if we have any accounts and attempt to sign in.
   */
  handleResponse(response: AuthenticationResult | null) {
    if (response !== null) {
      this.account = response.account;
      localStorage.setItem('accessToken', response.accessToken);
    } else {
      this.account = this.getAccount();
    }
  }

  /**
   * Calls loginPopup.
   */
  signIn(): Observable<AuthenticationResult> {
    return from(this.msalInstance.loginPopup(this.loginRequest));
  }

  /**
   * Logs out of current account.
   */
  logout(): void {
    localStorage.removeItem('accessToken');

    this.msalInstance.logoutRedirect({
      onRedirectNavigate: (url) => {
        // Return false if you would like to stop navigation after local logout
        //console.log(url);
        return false;
      },
    });
  }

  /**
   * Calls acquireTokenSilent.
   */
  private acquireTokenSilent(
    silentRequest: SilentRequest
  ): Observable<AuthenticationResult> {
    return from(this.msalInstance.acquireTokenSilent(silentRequest));
  }

  /**
   * Calls acquireTokenPopup.
   */
  private acquireTokenPopup(
    loginRequest: PopupRequest
  ): Observable<AuthenticationResult> {
    return from(this.acquireTokenPopup(loginRequest));
  }

  /**
   * Gets a token silently, or falls back to interactive popup.
   */
  private acquireAccessToken(
    silentRequest: SilentRequest,
    loginRequest: PopupRequest
  ): Observable<AuthenticationResult> {
    return this.acquireTokenSilent(silentRequest).pipe(
      //map((resp) => resp.accessToken),
      catchError((error) => {
        console.log('Silent token acquisition fails.', error);
        return this.acquireTokenPopup(loginRequest);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  /**
   * Gets the token to read user profile data from MS Graph silently, or falls back to interactive popup.
   */
  verifyOrUpdateAccessToken(): void {
    if (this.account) {
      this.silentTokenRequest.account = this.account;
    }

    this.acquireAccessToken(
      this.silentTokenRequest,
      this.loginRequest
    ).subscribe(
      (resp) => {
        //console.log('Access token', resp.accessToken);
        if (localStorage.getItem('accessToken') !== resp.accessToken) {
          localStorage.setItem('accessToken', resp.accessToken);
        }
      },
      (err) => {
        console.error('Access token error', err);
      }
      //() => console.log('Acces token completed.')
    );
  }

  isLogin(): boolean {
    return this.getAccount() ? true : false;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
