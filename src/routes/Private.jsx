import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User/UserContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ component: Component }) {
    const userCtx = useContext(UserContext);
    const { authStatus, verifyUser } = userCtx;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            await verifyUser();
            setLoading(false);
        };

        verifyToken();
    },[]);

    if (loading) return null;

    return (
        <>
            {authStatus ? <Component /> : <Navigate replace to="/iniciar-sesion" />}
        </>
    )
}