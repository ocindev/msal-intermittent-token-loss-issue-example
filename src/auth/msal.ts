import getConfig from "next/config";
import {RedirectRequest} from "@azure/msal-browser";
import {msal} from "@/pages/_app";
import {AuthenticationResult} from "@azure/msal-common";


export const msalRedirectRequest = (): RedirectRequest => {
    const { publicRuntimeConfig } = getConfig();

    return {
        redirectUri: 'http://localhost:3000',
        scopes: [ 'openid', 'offline_access', 'email', `${publicRuntimeConfig.azureAdClientId}/.default` ]
    }
}

export const handleLogout = async (): Promise<void> => {
    const account = msal.getActiveAccount();

    return msal.logoutRedirect({
        account: account,
        postLogoutRedirectUri: '/loggedOut',
    });
}

export const handleMsalRedirectLogin = (): Promise<void> => {
    const account = msal.getActiveAccount();

    return msal.acquireTokenRedirect({
        ...msalRedirectRequest(),
        account: account || undefined
    });
};

export const handleMsalSilentLogin = (forceRefresh: boolean = false): Promise<AuthenticationResult> => {
    const account = msal.getActiveAccount();

    return msal.acquireTokenSilent({
        ...msalRedirectRequest(),
        forceRefresh: forceRefresh,
        account: account || undefined
    });
};