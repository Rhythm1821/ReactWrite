import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../api";
import { 
    Box, 
    Typography, 
    Avatar, 
    Container, 
    Paper, 
    Grid, 
    Skeleton 
} from '@mui/material';
import {  ThemeProvider } from '@mui/material/styles'; // Updated import
import createTheme from '@mui/material/styles/createTheme';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import { LoadingSpinner } from "../utils";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

export default function UserAccount() {
    const [userAccount, setUserAccount] = useState({});
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (user && user.id) {
            api.get(`users/${user.id}/`)
                .then(res => setUserAccount(res.data))
                .catch(err => alert(err));
        }
    }, [user]);

    if (loading) {
        return (
            // <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            //     <Skeleton variant="circular" width={40} height={40} />
            // </Box>
            <LoadingSpinner />
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor="background.default" minHeight="100vh" py={8}>
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
                                {<Avatar 
                                        src={user?.image ? `${import.meta.env.VITE_IMAGE_BASE_URL}${user.image}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                        alt={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                        sx={{ width: 150, height: 150, mb: 2 }} 
                                    />}
                                <Typography variant="h5" gutterBottom fontWeight="bold">
                                    {user?.username}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography variant="h4" fontWeight="bold">
                                    Your Account
                                </Typography>
                                <Box mt={4}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                                        <Typography variant="h6">
                                            Username: <strong>{userAccount.username}</strong>
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                                        <Typography variant="h6">
                                            Email: <strong>{userAccount.email}</strong>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
