const UserReducer = (globalState, action) => {
    switch (action.type) {
        case "REGISTRO_EXITOSO":
            return {
                ...globalState,
                mensaje: "Usuario registrado exitosamente"
            }
        case "LOGIN_EXITOSO":
            localStorage.setItem('token', action.payload);
            return {
                ...globalState,
                authStatus: true
            }
        case "CERRAR_SESION":
            localStorage.removeItem('token');
            return {
                ...globalState,
                currentUser: null,
                authStatus: false,
                loading: false
            }
        case "VERIFICAR_USUARIO":
            return {
                ...globalState,
                authStatus: true,
                currentUser: action.payload
            }
        case "CHANGE_STATUS_LOADING":
            return {
                ...globalState,
                globalLoading: action.payload
            }
        default:
            return globalState;
    }
}

export default UserReducer;