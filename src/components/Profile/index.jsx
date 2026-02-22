import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/User/UserContext";
import { 
    Container, Box, Typography, TextField, Button, 
    Paper, Avatar, Grid, Divider, Alert 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function Profile() {
    const userCtx = useContext(UserContext);
    const { updateUser } = userCtx;

    // Extraemos los datos actuales del contexto
    const { username, email, country, address, zipcode } = userCtx.currentUser;

    const [userForm, setUserForm] = useState({
        username: "",
        country: "",
        address: "",
        zipcode: ""
    });

    useEffect(() => {
        const updateData = () => {
            return setUserForm({
                ...userForm,
                username,
                country,
                address,
                zipcode
            });
        };
        updateData();
    }, []);

    const handleChange = async (event) => {
        setUserForm({
            ...userForm,
            [event.target.name]: event.target.value,
        });
    };

    const sendData = async (event) => {
        event.preventDefault();
        await updateUser(userForm);
    };

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    backgroundColor: '#18181a', 
                    color: 'white', 
                    border: '1px solid #333',
                    borderRadius: 3 
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#28f5e8', width: 56, height: 56 }}>
                        <EditIcon sx={{ color: '#18181a' }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#28f5e8' }}>
                            MI PERFIL
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            Gestiona tu información de envío y contacto
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ backgroundColor: '#333', mb: 4 }} />

                <Box component="form" onSubmit={sendData} noValidate>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Nombre de Usuario"
                                name="username"
                                value={userForm.username}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="País"
                                name="country"
                                value={userForm.country}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Código Postal"
                                name="zipcode"
                                type="number"
                                value={userForm.zipcode}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Dirección Completa"
                                name="address"
                                value={userForm.address}
                                onChange={handleChange}
                                sx={inputStyles}
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            sx={{ 
                                backgroundColor: '#28f5e8', 
                                color: '#18181a', 
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.5,
                                '&:hover': { backgroundColor: '#1fcfc4' }
                            }}
                        >
                            Guardar Cambios
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

const inputStyles = {
    // Estilos generales
    "& .MuiOutlinedInput-root": {
        color: "white",
        "& fieldset": { borderColor: "#333" },
        "&:hover fieldset": { borderColor: "#28f5e8" },
        "&.Mui-focused fieldset": { borderColor: "#28f5e8" },
        
    },
    "& .MuiInputLabel-root": { color: "gray" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#28f5e8" },

    // Fix para Autocompletado
    "& .MuiOutlinedInput-input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #18181a inset !important",
        WebkitTextFillColor: "white !important",
        transition: "background-color 5000s ease-in-out 0s",
    },

    // Fix para quitar flechas del input number (Código Postal)
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
};