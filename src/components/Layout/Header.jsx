import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#28f5e8', borderBottom: '1px solid #111010', color: '#18181a' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* 1. Lado Izquierdo: Logo SVG (Rayo) */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px' }}>
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#18181a" stroke="#18181a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {/* Texto opcional: Solo el nombre de la tienda, no la instrucción */}
                        <Typography sx={{ fontWeight: 'bold', color: '#18181a', fontSize: '1.2rem', letterSpacing: '1px' }}>
                            GAMERSHOP
                        </Typography>
                    </Link>
                </Box>

                {/* 2. Lado Derecho: Registro y Login */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        component={Link}
                        to="/registro"
                        variant="outlined"
                        sx={{
                            borderColor: '#18181a',
                            color: '#18181a',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                borderColor: '#18181a',
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                transform: 'scale(1.1)',
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
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: '#333',
                                transform: 'scale(1.1)',
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