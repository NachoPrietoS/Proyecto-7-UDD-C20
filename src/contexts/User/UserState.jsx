import axiosClient from "../../config/axios";
import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";

const UserState = (props) => {
    const initialState = {
        currentUser: {
            username: "",
            email: "",
            country: "",
            address: "",
            zipcode: 0
        },
        cart: [],
        authStatus: false,
        sessionUrl: null,
        globalLoading: false
    };

    const [globalState, dispatch] = useReducer(UserReducer, initialState);

    const registerUser = async (form) => {
        try {
            const response = await axiosClient.post('/users/register', form);
            console.log('Respuesta del registro', response);

            dispatch({
                type: "REGISTRO_EXITOSO",
                payload: response.data
            })
            return true;
        } catch (error) {
            console.error('Error en el registro', error);
            return false;
        }
    }

    const loginUser = async (form) => {
        try {
            const res = await axiosClient.post('/users/login', form);
            const token = res.data.token;

            dispatch({
                type: "LOGIN_EXITOSO",
                payload: token
            })
            return true;
        } catch (error) {
            console.error('Error en el login', error);
            return false;
        }
    }

    const verifyUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosClient.defaults.headers.common['Authorization'];
        }
        try {
            const response = await axiosClient.get('/users/verify-user');
            dispatch({
                type: "VERIFICAR_USUARIO",
                payload: response.data.user
            })
        } catch (error) {
            return;
        }
    }

    const logoutUser = async () => {
        dispatch({
            type: "CERRAR_SESION"
        })
    }

    const setLoading = (status) => {
        dispatch({
            type: "CHANGE_STATUS_LOADING",
            payload: status
    })
}

    const updateUser = async (form) => {
        const token = localStorage.getItem('token');
        if(token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosClient.defaults.headers.common['Authorization'];
        }
        await axiosClient.put('/users/update-user', form);
    }

    return (
        <UserContext.Provider
            value={{
                currentUser: globalState.currentUser,
                cart: globalState.cart,
                authStatus: globalState.authStatus,
                sessionUrl: globalState.sessionUrl,
                globalLoading: globalState.globalLoading,
                registerUser,
                loginUser,
                logoutUser,
                verifyUser,
                updateUser,
                setLoading
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;