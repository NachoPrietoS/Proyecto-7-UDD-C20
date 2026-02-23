import { useContext, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import UserContext from "../../contexts/User/UserContext"; // Ajusta según tu carpeta
import {
    Container, Box, Typography, TextField, Button,
    Paper, Avatar, Link, Alert, Grid
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Register() {
    const ctx = useContext(UserContext);
    const navigate = useNavigate();

    const { registerUser } = ctx;

    const [newUser, setNewUser] = useState({
        username: "", // Cambiado de 'name' a 'username' para que coincida con tu Backend
        email: "",
        password: "",
        confirmarpassword: ""
    });

    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        // 1. Extraer valores para facilitar la lectura
        const { username, email, password, confirmarpassword } = newUser;

        // 2. Definir Expresión Regular para Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // --- BLOQUE DE VALIDACIONES ---

        // A. Validar campos vacíos (ya lo tenías, pero con trim)
        if (!username.trim() || !email.trim() || !password.trim()) {
            return setErrorMsg("Todos los campos son obligatorios");
        }

        // B. Validar longitud del nombre de usuario
        if (username.trim().length < 6) {
            return setErrorMsg("El nombre de usuario debe tener al menos 6 caracteres");
        }

        // C. Validar formato de Email
        if (!emailRegex.test(email)) {
            return setErrorMsg("Por favor, ingresa un correo electrónico válido");
        }

        // D. Validar longitud de contraseña (Seguridad básica)
        if (password.length < 6) {
            return setErrorMsg("La contraseña debe tener al menos 6 caracteres");
        }

        // E. Validación de coincidencia de contraseñas
        if (password !== confirmarpassword) {
            return setErrorMsg("Las contraseñas no coinciden");
        }

        // --- FIN DE VALIDACIONES ---

        // Si el código llega aquí, significa que pasó todas las pruebas
        const res = await registerUser(newUser);

        if (res) {
            navigate("/iniciar-sesion");
        } else {
            setErrorMsg("Error al registrar el usuario. El correo podría estar en uso.");
        }
    };

    return (
        <Container maxWidth="xs" sx={{ py: 8 }}>
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
                    <PersonAddIcon />
                </Avatar>

                <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#28f5e8' }}>
                    CREAR CUENTA
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
                        label="Nombre de usuario"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={newUser.username}
                        onChange={handleChange}
                        error={!newUser.username && errorMsg.includes("obligatorios")}
                        sx={inputStyles}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={newUser.email}
                        onChange={handleChange}
                        error={!newUser.username && errorMsg.includes("obligatorios")}
                        sx={inputStyles}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={newUser.password}
                        onChange={handleChange}
                        error={!newUser.username && errorMsg.includes("obligatorios")}
                        sx={inputStyles}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmarpassword"
                        label="Confirmar Contraseña"
                        type="password"
                        value={newUser.confirmarpassword}
                        onChange={handleChange}
                        error={!newUser.username && errorMsg.includes("obligatorios")}
                        sx={inputStyles}
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
                        Registrarse
                    </Button>

                    <Grid container justifyContent="center">
                        <Link
                            component={RouterLink}
                            to="/iniciar-sesion"
                            variant="body2"
                            sx={{ color: 'gray', textDecoration: 'none', '&:hover': { color: '#28f5e8' } }}
                        >
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

// Estilos para mantener la estética Gamer
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
        WebkitBoxShadow: "0 0 0 1000px #18181a inset !important", // Cubre el fondo feo del navegador
        WebkitTextFillColor: "white !important", // Mantiene el texto blanco
        transition: "background-color 5000s ease-in-out 0s", // Evita que el color cambie después
    }
};