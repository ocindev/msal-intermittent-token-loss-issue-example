import {handleMsalRedirectLogin} from "@/auth/msal";


export default function LoggedOutRoute() {
    return (
        <div>
            <h1>Logged out successfully</h1>
            <button className="btn btn-primary" onClick={() => handleMsalRedirectLogin()}>
                Log in
            </button>
        </div>
    )
}