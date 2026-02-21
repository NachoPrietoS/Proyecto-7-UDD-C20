import { useContext, useEffect } from "react";
import GameContext from "../../../contexts/Game/GameContext";
import { Container, Typography, Grid, Box } from "@mui/material";
import GameCard from "./GameCard";

const GameList = () => {
  const ctx = useContext(GameContext);

  if (!ctx) return null;

  const { games, getGames } = ctx;

  useEffect(() => {
    getGames();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{ mb: 6, fontWeight: '900', color: '#28f5e8' }}
      >
        CATÁLOGO DE JUEGOS
      </Typography>

      {/* Validación simplificada: solo consulta si el largo es 0 */}
      {games.length === 0 ? (
        <Typography textAlign="center" sx={{ color: 'white' }}>
          No hay juegos disponibles.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {games.map((game) => (
            /* Usamos 'size' en lugar de xs/md directo para cumplir con MUI v5/v6 */
            <Grid key={game._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <GameCard game={game} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default GameList;