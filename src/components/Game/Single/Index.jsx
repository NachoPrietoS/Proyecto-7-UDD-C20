import { useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box, Button, Chip, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SingleGame = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Usamos el encadenamiento opcional para evitar errores si state es null
    const game = location?.state?.game;

    // Si el usuario llega aquí sin pasar por el catálogo (ej: F5), lo devolvemos
    if (!game) {
        return (
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="white">No se encontró la información del juego.</Typography>
                <Button onClick={() => navigate('/games')} sx={{ mt: 2, color: '#28f5e8' }}>
                    Volver al catálogo
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8, color: 'white' }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ color: '#28f5e8', mb: 4 }}
            >
                Volver
            </Button>

            <Grid container spacing={6}>
                {/* Imagen del juego usando el campo 'img' de tu BBDD */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        component="img"
                        src={game.img}
                        alt={game.title}
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            border: '1px solid #333',
                            boxShadow: '0 0 20px rgba(40, 245, 232, 0.2)'
                        }}
                    />
                </Grid>

                {/* Información del juego */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Chip
                        label={game.platform}
                        sx={{ backgroundColor: '#28f5e8', color: '#18181a', fontWeight: 'bold', mb: 2 }}
                    />

                    <Typography variant="h2" sx={{ fontWeight: '900', mb: 2, textTransform: 'uppercase' }}>
                        {game.title}
                    </Typography>

                    <Typography variant="h4" sx={{ color: '#28f5e8', mb: 4, fontWeight: 'bold' }}>
                        ${game.price.toLocaleString('es-CL')} {game.currency}
                    </Typography>

                    <Divider sx={{ backgroundColor: '#333', mb: 4 }} />

                    <Typography variant="h6" sx={{ color: '#28f5e8', mb: 1 }}>
                        Descripción
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'gray', mb: 6, lineHeight: 1.8 }}>
                        {game.description}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                            backgroundColor: '#28f5e8',
                            color: '#18181a',
                            fontWeight: 'bold',
                            py: 2,
                            fontSize: '1.1rem',
                            '&:hover': { backgroundColor: '#1fcfc4' }
                        }}
                    >
                        Añadir al Carrito
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SingleGame;