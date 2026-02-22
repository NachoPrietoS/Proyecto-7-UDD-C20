import { useContext, useState } from "react";
// 1. Añadimos useLocation
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import UserContext from "../../contexts/User/UserContext";
import {
    Container, Box, Typography, TextField, Button,
    Paper, Avatar, Link, Alert, Grid, InputAdornment, IconButton
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
    const ctx = useContext(UserContext);
    const navigate = useNavigate();
    // 2. Capturamos la localización actual
    const location = useLocation();
    const { loginUser } = ctx;

    const [logUser, setLogUser] = useState({
        email: "",
        password: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setLogUser({
            ...logUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (!logUser.email.trim() || !logUser.password.trim()) {
            return setErrorMsg("Por favor, completa todos los campos.");
        }

        const res = await loginUser(logUser);

        if (res === true) {
            // 3. LÓGICA DE REDIRECCIÓN INTELIGENTE
            // Si existe 'from' en el state, vamos allá; si no, al home "/"
            const destination = location.state?.from || "/";

            // Redirigimos al destino original pasando de vuelta el objeto game si existía
            navigate(destination, {
                state: { game: location.state?.game },
                replace: true
            });
        } else {
            setErrorMsg("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: 10 }}>
            {/* ... Resto de tu código JSX es idéntico ... */}
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#18181a',
                    border: '1px solid #333',
                    borderRadius: 3,
                    color: 'white'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#28f5e8', color: '#18181a' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#28f5e8' }}>
                    INICIAR SESIÓN
                </Typography>

                {errorMsg && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2, backgroundColor: '#fed7d7', color: '#822727' }}>
                        {errorMsg}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={logUser.email}
                        onChange={handleChange}
                        sx={inputStyles}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={logUser.password}
                        onChange={handleChange}
                        sx={inputStyles}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        sx={{ color: 'gray' }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 4,
                            mb: 2,
                            py: 1.5,
                            backgroundColor: '#28f5e8',
                            color: '#18181a',
                            fontWeight: 'bold',
                            '&:hover': { backgroundColor: '#1fcfc4' }
                        }}
                    >
                        Ingresar
                    </Button>

                    <Grid container justifyContent="center">
                        <Link
                            component={RouterLink}
                            to="/registro"
                            variant="body2"
                            sx={{ color: 'gray', textDecoration: 'none', '&:hover': { color: '#28f5e8' } }}
                        >
                            ¿No tienes cuenta? Regístrate aquí
                        </Link>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

const inputStyles = {
    "& .MuiOutlinedInput-root": {
        color: "white",
        "& fieldset": { borderColor: "#333" },
        "&:hover fieldset": { borderColor: "#28f5e8" },
        "&.Mui-focused fieldset": { borderColor: "#28f5e8" },
    },
    "& .MuiInputLabel-root": { color: "gray" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#28f5e8" },
    "& .MuiOutlinedInput-input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #18181a inset !important",
        WebkitTextFillColor: "white !important",
        transition: "background-color 5000s ease-in-out 0s",
    },
};