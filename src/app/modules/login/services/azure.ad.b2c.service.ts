import { Injectable } from '@angular/core';
import {
  AccountInfo,
  AuthenticationResult,
  Configuration,
  InteractionRequiredAuthError,
  PopupRequest,
  PublicClientApplication,
  SilentRequest,
} from '@azure/msal-browser';
import { from, Observable } from 'rxjs';
import { AUTHORITY, CLIENT_ID, SCOPES } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AzureAdB2CService {
  private msalConfig: Configuration = {
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

  private msalInstance: PublicClientApplication;
  private account: AccountInfo | null;
  private loginRequest: PopupRequest;
  private silentRequest: SilentRequest;

  constructor() {
    this.msalInstance = new PublicClientApplication(this.msalConfig);
    this.account = null;
    this.loginRequest = {
      scopes: SCOPES, // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
    };
    this.silentRequest = {
      scopes: ['User.Read'], // Add scopes here for access token to be used at Microsoft Graph API endpoints.
      forceRefresh: false,
    };
  }

  /**
   * Calls getAllAccounts and determines the correct account to sign into, currently defaults to first account found in cache.
   * TODO: Add account chooser code
   *
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
   * @param response
   */
  handleResponse(response: AuthenticationResult | null) {
    if (response !== null) {
      this.account = response.account;
    } else {
      this.account = this.getAccount();
    }
  }

  signIn(): Observable<AuthenticationResult> {
    return from(this.msalInstance.loginPopup(this.loginRequest));
  }

  logout(): void {
    this.msalInstance.logoutRedirect({
      onRedirectNavigate: (url) => {
        // Return false if you would like to stop navigation after local logout
        //console.log(url);
        return false;
      },
    });
  }

  /**
   * Gets a token silently, or falls back to interactive popup.
   */
  private async getTokenPopup(
    silentRequest: SilentRequest,
    loginRequest: PopupRequest
  ): Promise<string | null> {
    try {
      const response: AuthenticationResult =
        await this.msalInstance.acquireTokenSilent(silentRequest);
      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        return this.msalInstance
          .acquireTokenPopup(loginRequest)
          .then((resp) => {
            return resp.accessToken;
          })
          .catch((err) => {
            console.error('Error acquiring token using redirect.', err);
            return null;
          });
      } else {
        console.error('Silent token acquisition fails.', error);
      }
    }
    return null;
  }

  async getAccessToken() {
    if (this.account) {
      this.silentRequest.account = this.account;
    }

    const token = await this.getTokenPopup(
      this.silentRequest,
      this.loginRequest
    );

    if (token && token.length > 0) {
      console.log(token);
    }
  }

  isLogin() {
    return this.getAccount() ? true : false;
  }
}
