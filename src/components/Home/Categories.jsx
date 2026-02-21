import { Box, Typography, Container, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import ps5 from '../../assets/ps5.jpg';
import xbox from '../../assets/xbox.jpg';
import nintendo from '../../assets/nintendo.jpg';

// Datos de las categorías (esto podrías traerlo de tu backend después)
const categories = [
    {
        title: 'PlayStation',
        image: ps5,
        color: '#003791'
    },
    {
        title: 'Xbox',
        image: xbox,
        color: '#107C10'
    },
    {
        title: 'Nintendo',
        image: nintendo,
        color: '#E60012'
    }
];

const Categories = () => {
    return (
        <Container sx={{ py: 8 }}>
            <Typography
                variant="h4"
                textAlign="center"
                sx={{ mb: 6, fontWeight: 'bold', color: '#28f5e8' }}
            >
                BUSCAR POR CONSOLA
            </Typography>

            {/* Cambiamos Grid2 por Grid (container) */}
            <Grid container spacing={4} justifyContent="center" alignItems="center">
                {categories.map((cat) => (
                    /* Cambiamos Grid2 por Grid (item) */
                    <Grid item xs={12} md={4} key={cat.title}>
                        <Card
                            sx={{
                                backgroundColor: '#18181a',
                                border: `1px solid ${cat.color}`,
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'translateY(-10px)' }
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={cat.image}
                                    alt={cat.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h5"
                                        textAlign="center"
                                        sx={{ color: 'white', fontWeight: 'bold' }}
                                    >
                                        {cat.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Categories;