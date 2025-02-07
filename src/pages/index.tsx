import {MsalAuthenticationTemplate, useMsal} from "@azure/msal-react";
import {InteractionStatus, InteractionType} from "@azure/msal-browser";
import {msalRedirectRequest} from "@/auth/msal";
import RootPage from "@/components/root";


const Loading = () => <div>Loading...</div>
const Error = () => <div>Error...</div>

function Home() {
    const redirectRequest = msalRedirectRequest();
    const {inProgress} = useMsal();

    if (inProgress !== InteractionStatus.None) {
        return <div>Loading... current status {inProgress}</div>;
    }
    return (
        <main className="container mx-auto w-full">
            <MsalAuthenticationTemplate
                interactionType={InteractionType.Redirect}
                authenticationRequest={redirectRequest}
                loadingComponent={Loading}
                errorComponent={Error}
            >
                <RootPage />
            </MsalAuthenticationTemplate>
        </main>
    );
}


Home.getInitialProps = () => {
    return {}
}

export default Home;