import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../api";
import { Box, Typography, CircularProgress, Avatar, Container } from '@mui/material';

export default function UserAccount() {
    const [userAccount, setUserAccount] = useState({});
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (user && user.id) {
            api.get(`users/${user.id}/`)
                .then(res => setUserAccount(res.data))
                .catch(err => console.log(err));
        }
    }, [user]);

    if (loading) return <CircularProgress />;

    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                {userAccount.image && (
                    <Avatar src={userAccount.image} alt={`${userAccount.username}'s profile`} sx={{ width: 100, height: 100, mb: 2 }} />
                )}
                <Typography variant="h4" gutterBottom>User Account</Typography>
                <Typography variant="h5" gutterBottom>Hello {user?.username}</Typography>
                <Box mt={2} width="100%" maxWidth="500px">
                    <Typography variant="h6" gutterBottom>Username: {userAccount.username}</Typography>
                    <Typography variant="h6" gutterBottom>Email: {userAccount.email}</Typography>
                </Box>
            </Box>
        </Container>
    );
}
