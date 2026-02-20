import { useContext } from "react";
import GameContext from "../../../contexts/Game/GameContext";

const GameList = () => {
  const ctx = useContext(GameContext);
  const { games } = ctx;

  return (
    <div>Listado de Juegos
      {
        games.map(game => (
          <div key={game.id}>
            <h2>{game.name}</h2>
            <p>Precio: {game.price}</p>
          </div>
        ))
      }

    </div>
  )
}

export default GameList;