import {useAccount} from "@azure/msal-react";
import {handleLogout, handleMsalSilentLogin} from "@/auth/msal";


export default function RootPage() {
    const account = useAccount();

    const handleFetchTokenSilently = async () => {
        const result = await handleMsalSilentLogin();
        console.log('##### Result of silent login', result);
    }

    return (
        <div className="items-center gap-y-2">
            <h2>Active Account</h2>
            <div className="justify-center">
                <span>{JSON.stringify(account, null, 2)}</span>
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <button className="btn btn-primary" onClick={() => handleLogout()}>Logout</button>
                <button className="btn btn-primary" onClick={() => handleFetchTokenSilently()}>Fetch token silently</button>
            </div>
        </div>
    );
}