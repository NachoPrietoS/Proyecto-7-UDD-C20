import { useContext, useEffect } from "react";
import UserContext from "../contexts/User/UserContext";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ component: Component}) {
    const userCtx = useContext(UserContext);
    const { authStatus, verifyUser } = userCtx;

    useEffect(() => {
        verifyUser();
    }, [authStatus]);

    return <>{authStatus ? <Navigate replace to="/" /> : <Component />}</>;
}