import React, { useContext, useEffect, useState } from 'react';
import '../styles/profile.css';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardContent, CardMedia, Typography, Box, Avatar, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, createTheme, ThemeProvider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FollowButton from '../components/FollowButton';
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
    const [user, setUser] = useState({
        image: '',
        username: '',
        email: '',
        bio: '',
        followers: [],
        follows: [],
        id: null
    });
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser, loading } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/profile/${id}/`);
                setUser(res.data);
                setError(false);
            } catch (error) {
                console.error("Failed to fetch user", error);
                setError(true);
            }
        };

        fetchUser();
    }, [id]);

    if (loading || error || !user.username) {
        return (
            <div className="absolute flex items-center justify-center inset-0 bg-opacity-50">
              <div
                className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )
    }
    // if (error || !user.username) return <h2>No user found</h2>;

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Card sx={{ mt: 4, p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {
                            <Avatar
                            alt={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            src={user?.image ? `${import.meta.env.VITE_IMAGE_BASE_URL}${user.image}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                            sx={{ width: 100, height: 100, mr: 2 }}
                        />
                        }
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h4" component="div">
                                {user.username}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {user.email}
                            </Typography>
                            <FollowButton status='followers' name={user.username} />
                        </Box>
                        {user.id === currentUser.id && (
                            <IconButton onClick={() => navigate(`/profile/edit/`)} size="large">
                                <EditIcon />
                            </IconButton>
                        )}
                    </Box>
                    <CardContent>
                        <Typography variant="body1" gutterBottom>
                            {user.bio}
                        </Typography>
                        <List>
                            <Typography variant="h6">Followers:</Typography>
                            {user.followers.map((follower, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>{follower.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={follower} />
                                    <FollowButton status='followers' name={follower} />
                                </ListItem>
                            ))}
                        </List>
                        <List>
                            <Typography variant="h6">Follows:</Typography>
                            {user.follows.map((follow, index) => (
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>{follow.charAt(0)}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={follow} />
                                    <FollowButton status='following' name={follow} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Container>
        </ThemeProvider>
    );
};

export default Profile;
