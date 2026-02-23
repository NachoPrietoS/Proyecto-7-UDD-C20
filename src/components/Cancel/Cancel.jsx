import { Container, Paper, Typography, Button, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Cancel() {
    return (
        <Container maxWidth="sm" sx={{ py: 10 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 5, 
                    textAlign: 'center', 
                    backgroundColor: '#18181a', 
                    color: 'white',
                    border: '1px solid #ff4b2b', // Rojo para indicar cancelación/error
                    borderRadius: 4
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ff4b2b' }} />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#ff4b2b' }}>
                    PAGO CANCELADO
                </Typography>

                <Typography variant="body1" sx={{ mb: 4, color: '#ccc' }}>
                    Parece que hubo un problema con la transacción o decidiste cancelar el proceso. 
                    No te preocupes, no se ha realizado ningún cargo a tu cuenta.
                </Typography>

                <Divider sx={{ backgroundColor: '#333', mb: 4 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button 
                        component={Link} 
                        to="/carrito" 
                        variant="contained" 
                        startIcon={<ShoppingCartIcon />}
                        sx={{ 
                            backgroundColor: '#28f5e8', 
                            color: '#18181a',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#1fcfc4' }
                        }}
                    >
                        Volver al Carrito
                    </Button>

                    <Button 
                        component={Link} 
                        to="/" 
                        sx={{ color: '#aaa', textTransform: 'none' }}
                    >
                        Ir a la Tienda Principal
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}