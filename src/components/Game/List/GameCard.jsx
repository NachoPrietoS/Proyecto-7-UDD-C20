import { Card, CardContent, CardMedia, Typography, Button, CardActions, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#18181a',
                border: '1px solid #333',
                '&:hover': { transform: 'scale(1.02)', borderColor: '#28f5e8' },
                transition: 'all 0.3s ease'
            }}
        >
            {/* Contenedor de Imagen con el campo 'img' */}
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={game.img} // <-- Ajustado a tu BBDD
                    alt={game.title}
                    sx={{ objectFit: 'contain', p: 2 }} // 'contain' por si las portadas varían de tamaño
                />
                {/* Etiqueta de Plataforma con el campo 'platform' */}
                <Chip
                    label={game.platform}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#28f5e8',
                        fontWeight: 'bold'
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                    {game.title}
                </Typography>

                {/* Breve descripción limitada */}
                <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                    {game.description ? `${game.description.substring(0, 50)}...` : "Sin descripción disponible"}
                </Typography>

                <Typography variant="h6" sx={{ color: '#28f5e8' }}>
                    ${game.price.toLocaleString('es-CL')} {game.currency}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2 }}>
                <Button
                    fullWidth
                    component={Link}
                    to={`/games/${game.slug}`} // <-- Usamos el slug para la ruta
                    variant="contained"
                    sx={{ backgroundColor: '#28f5e8', color: '#18181a', fontWeight: 'bold' }}
                >
                    Ver Detalles
                </Button>
            </CardActions>
        </Card>
    );
};

export default GameCard;