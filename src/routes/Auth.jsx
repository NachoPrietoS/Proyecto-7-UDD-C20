import { useContext, useEffect } from "react";
import UserContext from "../contexts/User/UserContext";
// 1. Añadimos useLocation
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ component: Component}) {
    const userCtx = useContext(UserContext);
    const { authStatus, verifyUser } = userCtx;
    // 2. Capturamos la ubicación actual
    const location = useLocation();

    useEffect(() => {
        verifyUser();
    }, [authStatus]);

    // 3. Si está logueado, verificamos si hay un destino previo (from)
    if (authStatus) {
        const destination = location.state?.from || "/";
        return (
            <Navigate 
                replace 
                to={destination} 
                state={{ game: location.state?.game }} 
            />
        );
    }

    // Si no está logueado, mostramos el componente (Login o Registro)
    return <Component />;
}