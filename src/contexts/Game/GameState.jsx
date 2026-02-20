import { useReducer } from 'react';
import GameContext from './GameContext';
import GameReducer from './GameReducer';
import axiosClient from '../../config/axios';

const GameState = (props) => {
    const initialState = {
        games: [ ]
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
                getGames
            }}
        >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameState;