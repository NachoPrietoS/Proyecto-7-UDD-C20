import { use, useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { 
    AppBar, Toolbar, Button, Box, Typography, IconButton, Badge 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";

export default function Header () {
    const {
        currentUser,
        cart,
        authStatus,
        verifyUser,
        logoutUser,
        getCart,
        setLoading,
    } = useContext(UserContext);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        getCart();
    }, [currentUser]);

    useEffect(() => {
        const totalItems = Array.isArray(cart) 
    ? cart.reduce((acc, curr) => acc + curr.quantity, 0) 
    : 0;
        setTotal(totalItems);
    }, [cart]);

    const handleLogout = async () => {
        setLoading(true);
        await logoutUser();
        setLoading(false);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#28f5e8', borderBottom: '1px solid #111010', color: '#18181a' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* 1. Lado Izquierdo: Logo */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: '8px' }}>
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#18181a" stroke="#18181a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <Typography sx={{ fontWeight: 'bold', color: '#18181a', fontSize: '1.2rem', letterSpacing: '1px', display: { xs: 'none', md: 'block' } }}>
                            GAMESTORE
                        </Typography>
                    </Link>
                </Box>

                {/* 2. Centro: Saludo Condicional */}
                {authStatus && (
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: '600', color: '#18181a' }}>
                            ¡Hola, {currentUser?.username || "Gamer"}!
                        </Typography>
                    </Box>
                )}

                {/* 3. Lado Derecho: Acciones de Usuario */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1, alignItems: 'center', fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
                    {authStatus ? (
                        <>
                            <Button
                                component={Link}
                                to="/perfil"
                                startIcon={<AccountCircleIcon />}
                                sx={{ color: '#18181a', fontWeight: 'bold', textTransform: 'none' }}
                            >
                                Perfil
                            </Button>

                            <IconButton component={Link} to="/carrito" sx={{ color: '#18181a' }}>
                                <Badge badgeContent={total} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            <Button
                                onClick={handleLogout}
                                variant="outlined"
                                startIcon={<LogoutIcon />}
                                sx={{
                                    borderColor: '#18181a',
                                    color: '#18181a',
                                    ml: 1,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    '&:hover': { borderColor: '#18181a', backgroundColor: 'rgba(0,0,0,0.1)' }
                                }}
                            >
                                Salir
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/registro" variant="outlined" sx={guestButtonStyles}>
                                Regístrate
                            </Button>
                            <Button component={Link} to="/iniciar-sesion" variant="contained" sx={loginButtonStyles}>
                                Login
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

// Estilos auxiliares
const guestButtonStyles = {
    borderColor: '#18181a',
    color: '#18181a',
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' }
};

const loginButtonStyles = {
    backgroundColor: '#18181a',
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#333' }
};