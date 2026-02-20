import { useReducer } from 'react';
import GameContext from './GameContext';
import GameReducer from './GameReducer';

const GameState = (props) => {
    const initialState = {
        games: [
            {
                id: 0,
                name: 'Juego 1',
                price: 49990,
            },
            {
                id: 1,
                name: 'Juego 2',
                price: 59990,
            },
            {
                id: 2,
                name: 'Juego 3',
                price: 69990,
            },
        ]
    }

    const [globalState, dispatch] = useReducer(GameReducer, initialState);

    return (
        <GameContext.Provider
            value={{
                games: globalState.games
            }}
        >
            {props.children}
        </GameContext.Provider>
    )
}

export default GameState;