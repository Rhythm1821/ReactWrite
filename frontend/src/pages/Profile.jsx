import React, { useContext, useEffect, useState } from 'react';
import { Card, Typography, Box, Avatar, Container, IconButton, createTheme, ThemeProvider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Posts from '../components/Posts';
import Followers from '../components/Followers';
import Following from '../components/Following';
import api from '../api';

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
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);
    const [postCount, setPostCount] = useState(0);
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

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Card sx={{ mt: 4, p: 4, borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', width: '100%', mx: 'auto', backgroundColor: '#f9f9f9' }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' }, 
                        alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' } 
                      }}
                    >
                        <Avatar
                            alt="User Avatar"
                            src={user?.image ? `${import.meta.env.VITE_IMAGE_BASE_URL}${user.image}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                            sx={{ width: 120, height: 120, mr: { lg: 2 }, mb: { xs: 2, sm: 2, md: 2, lg: 0 }, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Box 
                          sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' }, 
                            alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' } 
                          }}
                        >
                            <Typography sx={{ mr: { lg: 3 }, mb: { xs: 1, sm: 1, md: 1, lg: 0 } }} variant="h4" component="div" fontWeight="bold">
                                {user.username}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' }, mt: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 1, sm: 1, md: 1, lg: 0 } }}>
                                    <Typography variant="body1" color="textSecondary" sx={{ mx: 'auto' }}>
                                        {postCount} Posts
                                    </Typography>
                                    <div className='mx-2 text-[#00000099]'>
                                        <button onClick={() => setOpenFollowers(!openFollowers)}>{user.followers.length} Followers</button>
                                        {openFollowers && <Followers followers={user.followers} setOpenFollowers={setOpenFollowers} />}
                                    </div>
                                    <div className='mx-2 text-[#00000099]'>
                                        <button onClick={() => setOpenFollowing(!openFollowing)}>{user.follows.length} Following</button>
                                        {openFollowing && <Following following={user.follows} setOpenFollowing={setOpenFollowing} />}
                                    </div>
                                </Box>
                                <Typography variant="body1" color="textSecondary" sx={{ textAlign: { xs: 'center', lg: 'center' }, my: 2 }}>
                                    {user.bio}
                                </Typography>
                            </Box>
                        </Box>
                        {user.id === currentUser.id && (
                            <IconButton 
                              onClick={() => navigate(`/profile/edit/`)} 
                              size="large" 
                              sx={{ alignSelf: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' }, mt: { xs: 1, sm: 1, md: 1, lg: 0 } }}
                            >
                                <EditIcon />
                            </IconButton>
                        )}
                    </Box>
                </Card>

                {/* All the posts by the profile */}
                <Posts author={user.username} onPostCountChange={setPostCount} />
            </Container>
        </ThemeProvider>
    );
};

export default Profile;
