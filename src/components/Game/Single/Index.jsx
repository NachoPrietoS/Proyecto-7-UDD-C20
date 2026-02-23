import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../../contexts/User/UserContext";
import GameContext from "../../../contexts/Game/GameContext";
import { Container, Grid, Typography, Box, Button, Chip, Divider, Stack } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { formatCLP } from "../../../utils/formatCLP";

const SingleGame = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const { authStatus, cart, addToCart } = userCtx;

    const game = location?.state?.game;

    // 1. Verificamos si este juego ya existe en el carrito global
    const itemInCart = cart.find(item => item._id === game?._id);

    // 2. Función para manejar la lógica de cantidades (+1 / -1)
    const updateQuantity = async (amount) => {
        let newCart;
        
        if (amount === -1 && itemInCart.quantity === 1) {
            // Si tiene 1 unidad y restamos, lo eliminamos del arreglo
            newCart = cart.filter(item => item._id !== game._id);
        } else {
            // Si sumamos o restamos unidades (sin llegar a 0)
            newCart = cart.map(item => 
                item._id === game._id 
                    ? { ...item, quantity: item.quantity + amount } 
                    : item
            );
        }
        await addToCart(newCart);
    };

    // 3. Función para el primer añadido
    const handleInitialAdd = async () => {
        if (!authStatus) {
            return navigate("/iniciar-sesion", {
                state: { from: location.pathname, game: game }
            });
        }

        const newProduct = {
            _id: game._id,
            name: game.title,
            price: game.price,
            priceId: game.priceId,
            quantity: 1,
            img: game.img,
            slug: game.slug
        };

        await addToCart([...cart, newProduct]);
        // Eliminamos la navegación automática al carrito para ver el cambio aquí mismo
    };

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

                <Grid size={{ xs: 12, md: 6 }}>
                    <Chip
                        label={game.platform}
                        sx={{ backgroundColor: '#28f5e8', color: '#18181a', fontWeight: 'bold', mb: 2 }}
                    />

                    <Typography variant="h2" sx={{ fontWeight: '900', mb: 2, textTransform: 'uppercase' }}>
                        {game.title}
                    </Typography>

                    <Typography variant="h4" sx={{ color: '#28f5e8', mb: 4, fontWeight: 'bold' }}>
                        {formatCLP(game.price)}
                    </Typography>

                    <Divider sx={{ backgroundColor: '#333', mb: 4 }} />

                    <Typography variant="h6" sx={{ color: '#28f5e8', mb: 1 }}>
                        Descripción
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'gray', mb: 6, lineHeight: 1.8 }}>
                        {game.description}
                    </Typography>

                    {/* LÓGICA DE BOTONES DINÁMICOS */}
                    <Box sx={{ mt: 2 }}>
                        {!itemInCart ? (
                            // Botón principal si NO está en el carrito
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleInitialAdd}
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
                                {authStatus ? "Añadir al Carrito" : "Inicia sesión para comprar"}
                            </Button>
                        ) : (
                            // Controles de cantidad si YA está en el carrito
                            <Box>
                                <Typography variant="h6" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                                    Ya tienes <span style={{ color: '#28f5e8' }}>{itemInCart.quantity}</span> unidades en tu carro
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<AddIcon />}
                                        onClick={() => updateQuantity(1)}
                                        sx={{ 
                                            color: '#28f5e8', 
                                            borderColor: '#28f5e8', 
                                            fontWeight: 'bold',
                                            '&:hover': { borderColor: '#1fcfc4', backgroundColor: 'rgba(40, 245, 232, 0.05)' } 
                                        }}
                                    >
                                        Añadir otra
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<RemoveIcon />}
                                        onClick={() => updateQuantity(-1)}
                                        sx={{ 
                                            color: '#ff5252', 
                                            borderColor: '#ff5252', 
                                            fontWeight: 'bold',
                                            '&:hover': { borderColor: '#ff1744', backgroundColor: 'rgba(255, 82, 82, 0.05)' }
                                        }}
                                    >
                                        {itemInCart.quantity === 1 ? "Quitar del carro" : "Quitar una"}
                                    </Button>
                                </Stack>
                                <Button 
                                    fullWidth 
                                    onClick={() => navigate('/carrito')}
                                    sx={{ mt: 3, color: 'gray', textTransform: 'none', textDecoration: 'underline' }}
                                >
                                    Ir a finalizar la compra
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SingleGame;