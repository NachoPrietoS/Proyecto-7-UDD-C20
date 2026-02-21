import { Box, Typography, Container, Button } from '@mui/material';
import { keyframes } from '@mui/system';
import { Link } from 'react-router-dom';

// Definimos la animación de levitación para el título
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const Hero = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '70vh', // Ocupa gran parte de la pantalla inicial
                textAlign: 'center',
            }}
        >
            <Container maxWidth="md">
                {/* Título con los colores de tu proyecto y movimiento */}
                <Typography
                    variant="h1"
                    sx={{
                        fontWeight: '900',
                        fontSize: { xs: '3rem', md: '5.5rem' },
                        mb: 2,
                        // Usamos el turquesa que tienes en el Header para coherencia
                        background: 'linear-gradient(90deg, #28f5e8, #ffffff)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: `${float} 4s ease-in-out infinite`,
                        filter: 'drop-shadow(0px 0px 15px rgba(40, 245, 232, 0.4))',
                    }}
                >
                    GAME STORE
                </Typography>

                {/* Párrafo de bienvenida usando el contexto de Nacho */}
                <Typography
                    variant="h5"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        mb: 4,
                        fontWeight: '300',
                        lineHeight: 1.6
                    }}
                >
                    ¡Bienvenido! Explora nuestra colección exclusiva de juegos para consolas.
                    Tu próxima gran aventura comienza aquí.
                </Typography>

                {/* Botón de acción hacia el catálogo */}
                <Button
                    component={Link}
                    to="/games"
                    variant="contained"
                    size="large"
                    sx={{
                        backgroundColor: '#28f5e8',
                        color: '#18181a',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        px: 5,
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: '#1fcfc4',
                            transform: 'scale(1.1)',
                            boxShadow: '0px 0px 20px rgba(40, 245, 232, 0.5)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    IR AL CATÁLOGO
                </Button>
            </Container>
        </Box>
    );
};

export default Hero;