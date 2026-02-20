const GameReducer = (globalState, action) => {
    switch (action.type) {
        case "OBTENER_JUEGOS":
            return {
                ...globalState,
                games: action.payload
            }
        default:
            return globalState;
    }
}

export default GameReducer;