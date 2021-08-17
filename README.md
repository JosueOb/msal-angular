# MSAL Angular

Angular project that preforms the authentication and authorization process using the MSAL Library.

## MSAL library

_The [MSAL library](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser#about) for JavaScript enables client-side JavaScript applications to authenticate users using [Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview) work and school accounts (AAD), Microsoft personal accounts (MSA) and social identity providers like Facebook, Google, LinkedIn, Microsoft accounts, etc. through [Azure AD B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/overview#identity-providers) service. It also enables your app to get tokens to access Microsoft Cloud services such as Microsoft Graph._

### Prerequisites
- `@azure/msal-browser` is meant to be used in [Single-Page Application scenarios](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-overview).
- Before using `@azure/msal-browser` you will need to [register a Single Page Application in Azure AD](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration) to get a valid `clientId` for configuration, and to register the routes that your app will accept redirect traffic on.

### Installation

Via NPM

```javascript
npm install @azure/msal-browser
```

## Library-related topics
-  [Migrating from Previous MSAL Versions](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/v1-migration.md)
- [Initialization](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/initialization.md)
- [Logging in a User](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/login-user.md)
- [Acquiring and Using an Access Token](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md)
- [Managing Token Lifetimes](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/token-lifetimes.md)
- [Managing Accounts](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md)
- [Logging Out a User](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/logout.md)
- [Configuration Options](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md)
- [Request and Response Details](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md)
- [Cache Storage](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/caching.md)
- [Implicit Flow vs Authorization Code Flow with PKCE](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser#implicit-flow-vs-authorization-code-flow-with-pkce)
- [Working with MSAL.js and Azure AD B2C](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md)

## Get started 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.3.

## Install dependencies
Run `npm install` to install project dependencipes.
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.