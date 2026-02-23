import { useContext } from "react";
import UserContext from "../../contexts/User/UserContext";
import { formatCLP } from "../../utils/formatCLP";
import {
    Container, Typography, Box, Paper, IconButton,
    Button, Divider, Stack, Grid, Card, CardMedia
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const { cart, addToCart, getCheckoutSession } = useContext(UserContext);
    const navigate = useNavigate();

    const updateQuantity = async (id, amount) => {
        const newCart = cart.map(item => {
            if (item._id === id) {
                const newQty = item.quantity + amount;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        await addToCart(newCart);
    };

    const removeItem = async (id) => {
        const newCart = cart.filter(item => item._id !== id);
        await addToCart(newCart);
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cart.length === 0) {
        return (
            <Container sx={{ py: 15, textAlign: 'center', color: 'white' }}>
                <ShoppingBagIcon sx={{ fontSize: 80, color: '#333', mb: 2 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>TU INVENTARIO ESTÁ VACÍO</Typography>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/games')}
                    sx={{ color: '#28f5e8', borderColor: '#28f5e8', fontWeight: 'bold', px: 4 }}
                >
                    REABASTECER
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', py: 8, backgroundColor: '#0a0a0a' }}>
            <Container maxWidth="lg">
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 6 }}>
                    <Box sx={{ width: 10, height: 40, bgcolor: '#28f5e8', borderRadius: 1 }} />
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: '900', letterSpacing: -1 }}>
                        CHECKOUT <span style={{ color: '#28f5e8' }}>_01</span>
                    </Typography>
                </Stack>

                {/* CLAVE: alignItems="flex-start" evita que la columna del resumen crezca con la de productos */}
                <Grid container spacing={6} alignItems="flex-start">

                    {/* LISTADO DE PRODUCTOS */}
                    <Grid item xs={12} md={7}>
                        <Stack spacing={3}>
                            {cart.map((item) => (
                                <Card
                                    key={item._id}
                                    sx={{
                                        display: 'flex',
                                        bgcolor: '#121214',
                                        border: '1px solid #333',
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        transition: '0.3s',
                                        '&:hover': { borderColor: '#28f5e8', transform: 'translateX(10px)' }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 140, height: 160, objectFit: 'cover' }}
                                        image={item.img}
                                        alt={item.name}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                    {item.name.toUpperCase()}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: '#28f5e8', letterSpacing: 1 }}>
                                                    LICENCIA DIGITAL PERMANENTE
                                                </Typography>
                                            </Box>
                                            <IconButton onClick={() => removeItem(item._id)} sx={{ color: 'rgba(255, 82, 82, 0.6)', '&:hover': { color: '#ff5252' } }}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mt: 'auto' }}>
                                            <Stack direction="row" alignItems="center" sx={{ bgcolor: '#000', borderRadius: 2, border: '1px solid #333', p: 0.5 }}>
                                                <IconButton size="small" onClick={() => updateQuantity(item._id, -1)} sx={{ color: 'white' }}>
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography sx={{ color: 'white', px: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                                                <IconButton size="small" onClick={() => updateQuantity(item._id, 1)} sx={{ color: 'white' }}>
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                            <Typography variant="h6" sx={{ color: 'white', fontWeight: '900' }}>
                                                {formatCLP(item.price * item.quantity)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Stack>
                    </Grid>

                    {/* RESUMEN ESTILO HUD (FIJO AL HACER SCROLL) */}
                    <Grid item xs={12} md={5} sx={{ position: 'sticky', top: 20 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                bgcolor: 'rgba(40, 245, 232, 0.03)',
                                border: '2px solid #28f5e8',
                                borderRadius: 4,
                                color: 'white',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 0 20px rgba(40, 245, 232, 0.1)'
                            }}
                        >
                            <Typography variant="h5" sx={{ color: '#28f5e8', fontWeight: 'bold', mb: 4, letterSpacing: 1 }}>
                                RESUMEN DE MISIÓN
                            </Typography>

                            <Stack spacing={2.5}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'gray' }}>SUBTOTAL</Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>{formatCLP(total)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'gray' }}>IMPUESTO</Typography>
                                    <Typography sx={{ color: '#28f5e8', fontWeight: 'bold' }}>GRATIS</Typography>
                                </Box>

                                <Divider sx={{ bgcolor: '#28f5e8', opacity: 0.2, my: 1 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>TOTAL FINAL</Typography>
                                    <Typography variant="h4" sx={{ color: '#28f5e8', fontWeight: '900' }}>
                                        {formatCLP(total)}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => getCheckoutSession()}
                                    endIcon={<RocketLaunchIcon />}
                                    sx={{
                                        mt: 3,
                                        py: 2.5,
                                        bgcolor: '#28f5e8',
                                        color: '#18181a',
                                        fontWeight: '900',
                                        fontSize: '1.2rem',
                                        borderRadius: 0, // Volvemos a un estilo más técnico
                                        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 92% 100%, 0 100%)',
                                        '&:hover': { bgcolor: '#1fcfc4', transform: 'scale(1.02)' },
                                        transition: '0.3s'
                                    }}
                                >
                                    INICIAR PAGO
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}