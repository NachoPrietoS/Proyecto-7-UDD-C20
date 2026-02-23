import { useEffect, useContext } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/User/UserContext';

const Success = () => {
    // Dentro de tu componente Success
    const { clearCart } = useContext(UserContext); // Asumiendo que crearás esta función en el State

    useEffect(() => {
        const processClear = async () => {
            await clearCart(); // Llama a la función que conecta con el endpoint de arriba
        };
        processClear();
    }, []);

    const navigate = useNavigate();
    const { getCart } = useContext(UserContext);

    useEffect(() => {
        // Al cargar esta página, refrescamos el carrito 
        // para que se vea vacío (ya que la compra se procesó)
        getCart();
    }, []);

    return (
        <Container maxWidth="sm" sx={{ py: 15, textAlign: 'center' }}>
            <Paper
                elevation={0}
                sx={{
                    p: 6,
                    bgcolor: 'rgba(40, 245, 232, 0.03)',
                    border: '2px solid #28f5e8',
                    borderRadius: 4,
                    backdropFilter: 'blur(10px)'
                }}
            >
                <CheckCircleOutlineIcon sx={{ fontSize: 100, color: '#28f5e8', mb: 2 }} />
                <Typography variant="h3" sx={{ color: 'white', fontWeight: '900', mb: 2 }}>
                    MISIÓN CUMPLIDA
                </Typography>
                <Typography variant="h6" sx={{ color: 'gray', mb: 4 }}>
                    Tu pago ha sido procesado con éxito. Los códigos de tus juegos han sido enviados a tu correo.
                </Typography>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/games')}
                    sx={{
                        bgcolor: '#28f5e8',
                        color: '#18181a',
                        fontWeight: 'bold',
                        py: 2,
                        '&:hover': { bgcolor: '#1fcfc4' }
                    }}
                >
                    VOLVER A LA BASE (TIENDA)
                </Button>
            </Paper>
        </Container>
    );
};

export default Success;