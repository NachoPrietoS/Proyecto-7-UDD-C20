import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // No olvides instalar @mui/icons-material

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#28f5e8', borderBottom: '1px solid #111010', color: '#18181a' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* 1. Lado Izquierdo: Botón Menú (Juegos) */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                        component={Link}
                        to="/games"
                        startIcon={<MenuIcon />}
                        sx={{
                            color: '#18181a',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
                        }}
                    >
                        Juegos
                    </Button>
                </Box>

                {/* 2. Lado Derecho: Registro y Login */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/registro"
                        variant="outlined"
                        sx={{
                            borderColor: '#18181a',
                            color: '#18181a',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease-in-out', // Suaviza el movimiento
                            '&:hover': {
                                borderColor: '#18181a',
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                transform: 'scale(1.1)', // Aumenta el tamaño un 10%
                            }
                        }}
                    >
                        Regístrate
                    </Button>

                    <Button
                        component={Link}
                        to="/iniciar-sesion"
                        variant="contained"
                        sx={{
                            backgroundColor: '#18181a',
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease-in-out', // Suaviza el movimiento
                            '&:hover': {
                                backgroundColor: '#333',
                                transform: 'scale(1.1)', // Aumenta el tamaño un 10%
                            }
                        }}
                    >
                        Login
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Header;