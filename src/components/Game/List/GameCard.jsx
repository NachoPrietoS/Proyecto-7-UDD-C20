import { Card, CardContent, CardMedia, Typography, Button, CardActions, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { formatCLP } from '../../../utils/formatCLP';

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
            {/* 1. Contenedor de Imagen con Link */}
            <Box 
                component={Link} // Convertimos el Box en un Link
                to={`/games/${game.slug}`} 
                state={{ game }}
                sx={{ 
                    position: 'relative', 
                    display: 'block', // Asegura que el link ocupe todo el espacio
                    cursor: 'pointer',
                    textDecoration: 'none'
                }}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={game.img}
                    alt={game.title}
                    sx={{ 
                        objectFit: 'contain', 
                        p: 2,
                        transition: 'opacity 0.3s ease',
                        '&:hover': { opacity: 0.8 } // Efecto visual al pasar el mouse
                    }}
                />
                
                <Chip
                    label={game.platform}
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#28f5e8',
                        fontWeight: 'bold',
                        pointerEvents: 'none' // Para que el chip no interfiera con el clic del link
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                    {game.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'gray', mb: 2 }}>
                    {game.description ? `${game.description.substring(0, 50)}...` : "Sin descripción disponible"}
                </Typography>

                <Typography variant="h6" sx={{ color: '#28f5e8' }}>
                    {formatCLP(game.price)}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2 }}>
                <Button
                    fullWidth
                    component={Link}
                    to={`/games/${game.slug}`}
                    state={{ game }}
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#28f5e8', 
                        color: '#18181a', 
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#1fcfc4' }
                    }}
                >
                    Ver Detalles
                </Button>
            </CardActions>
        </Card>
    );
};

export default GameCard;