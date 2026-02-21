import { Box, Typography, Container, Stack, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#28f5e8',
                color: 'white',
                py: 4,
                mt: 'auto',
                borderTop: '1px solid #333'
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    {/* Copyright */}
                    <Typography variant="body2" sx={{ color: 'black' }}>
                        © {new Date().getFullYear()} GAMES. Creado por Ignacio Prieto.
                    </Typography>

                    {/* Iconos de Redes Sociales */}
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            href="https://instagram.com/tu-usuario"
                            target="_blank"
                            sx={{ color: '#E1306C', '&:hover': { opacity: 0.7 } }}
                        >
                            <InstagramIcon />
                        </IconButton>

                        <IconButton
                            href="https://github.com/tu-usuario"
                            target="_blank"
                            sx={{ color: 'white', '&:hover': { opacity: 0.7 } }}
                        >
                            <GitHubIcon />
                        </IconButton>

                        <IconButton
                            href="https://linkedin.com/in/tu-usuario"
                            target="_blank"
                            sx={{ color: '#0A66C2', '&:hover': { opacity: 0.7 } }}
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>

                    {/* Info Stripe */}
                    <Typography variant="caption" sx={{ color: 'black', opacity: 0.9, fontStyle: 'italic' }}>
                        Pagos seguros con Stripe 🔒
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;