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
            zipcode: ""
        },
        cart: [],
        authState: false
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
            return;
        } catch (error) {
            console.error('Error en el registro', error);
            return error.response.data.message;
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
            return;
        } catch (error) {
            console.error('Error en el login', error);
            return error.response.data.message;
        }
    }

    const logoutUser = async () => {
        dispatch({
            type: "LOGOUT"
        })
    }

    return (
        <UserContext.Provider
            value={{
                user: initialState.currentUser,
                registerUser,
                loginUser,
                logoutUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;