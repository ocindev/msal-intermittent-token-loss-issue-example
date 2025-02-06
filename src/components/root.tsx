import {useMsal} from "@azure/msal-react";
import {handleLogout} from "@/auth/msal";


export default function RootPage() {
    const {accounts} = useMsal();

    if (accounts.length == 0) {
        return <div>Error... not authenticated</div>
    }

    const account = accounts[0];

    return (
        <div className="flex flex-col items-center gap-y-2">
            <h2>Active Account</h2>
            <div className="flex flex-col items-center gap-y-3">
                <span>{JSON.stringify(account, null, 2)}</span>
            </div>
            <div>
                <button className="btn btn-primary" onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    );
}