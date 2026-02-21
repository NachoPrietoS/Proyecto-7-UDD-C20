import { useReducer } from 'react';
import GameContext from './GameContext';
import GameReducer from './GameReducer';
import axiosClient from '../../config/axios';

const GameState = (props) => {
    const initialState = {
        games: [],
        currentGame: {
            _id: null,
            title: "",
            description: "",
            price: "",
            platform: "",
            img: "",
            slug: ""
        }
    }

    const [globalState, dispatch] = useReducer(GameReducer, initialState);

    const getGames = async () => {
        try {
            const response = await axiosClient.get('/games');
            console.log(response);

            dispatch({
                type: "OBTENER_JUEGOS",
                payload: response.data.games
            })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <GameContext.Provider
            value={{
                games: globalState.games,
                currentGame: globalState.currentGame,
                getGames
            }}
        >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameState;