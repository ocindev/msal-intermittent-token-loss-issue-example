
# Example: Intermittent token claim loss under slower conditions after migration to @azure/msal-browser@4.x


### Steps to reproduce

1. Add `AZURE_AD_AUTHORITY`, `AZURE_AD_CLIENT_ID` and `AZURE_AD_RESOURCE` to .env
2. Make sure that http://localhost:3000 is added to the list of allowed redirect urls in EntraID
3. use `npm run build` to create Next.js production build
4. use `npm run start` to start production build server
5. Open application in browser ( verified with `Firefox@134.0.1` and `Chrome@132.0.6834.168`)
6. Login and wait to be redirect to the '/' path 
7. The account data should be displayed as JSON
8. (Only chrome): Open the developer tools and go to the Performance tab - enable 4x CPU slowdown 
9. Press F5 to do a full reload
10. The account data shown is missing the idToken and all of its claims
11. Press the `Fetch token silently` button
12. The logs show that the event payload itself is also missing the idToken


### Observations:

- when using the dev build of Next.js the issue can only be reproduced within Chrome when using bigger slowdown of 20x