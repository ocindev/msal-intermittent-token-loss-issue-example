import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {BrowserCacheLocation, EventType, LogLevel, ProtocolMode, PublicClientApplication} from "@azure/msal-browser";
import getConfig from "next/config";
import {AuthenticationResult} from "@azure/msal-common";
import {MsalProvider} from "@azure/msal-react";

const {publicRuntimeConfig} = getConfig();

export const msal = new PublicClientApplication({
    auth: {
        clientId: publicRuntimeConfig.azureAdClientId,
        authority: publicRuntimeConfig.azureAdAuthority,
        navigateToLoginRequestUrl: false,
        protocolMode: ProtocolMode.OIDC,
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        secureCookies: true,
    },
    system: {
        loggerOptions: {
            logLevel: LogLevel.Trace,
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        console.log(message);
                        return;
                }
            }
        }
    }
})


msal.initialize()
    .then(() => {
        const accounts = msal.getAllAccounts();
        if (accounts.length > 0) {
            const account = accounts[0];

            msal.setActiveAccount(account);
        }

        msal.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                const {account} = event.payload as AuthenticationResult;
                msal.setActiveAccount(account);
            } else if(event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS && event.payload){
                const {account} = event.payload as AuthenticationResult;
                msal.setActiveAccount(account);
                console.log('##### Acquired token successfully. idToken exists:', account?.idToken !== undefined, 'idToken claims are present', account?.idTokenClaims !== undefined);
            }
        })
    });


export default function App({Component, pageProps}: AppProps) {
    return <MsalProvider instance={msal}><Component {...pageProps} /></MsalProvider>;
}
