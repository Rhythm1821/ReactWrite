import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Card, Typography, Box, Avatar, Container, IconButton, createTheme, ThemeProvider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext, UserProvider } from '../contexts/UserContext';
import Posts from '../components/Posts';
import Followers from '../components/Followers';
import Following from '../components/Following';
import api from '../api';
import { LoadingSpinner } from '../utils';
import { debounce } from "lodash";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const [openFollowers, setOpenFollowers] = useState(false);
    const [openFollowing, setOpenFollowing] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser, loading } = useContext(UserContext);
    const [followingStatus, setFollowingStatus] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const res = await api.get(`/users/profile/${id}/`);
            setUser(res.data);
            setError(false);
        } catch (error) {
            console.error("Failed to fetch user", error);
            setError(true);
        }
    }, [id]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (!loading && currentUser && user) {
            setFollowingStatus(currentUser.follows.some(follow => follow.id === user.id));
        }
    }, [loading, currentUser, user]);

    const handleFollow = useMemo(() => debounce(async () => {
        try {
            await api.post(`/users/following/${user.username}/`);
            setFollowingStatus(prevStatus => !prevStatus);
        } catch (error) {
            console.error("Failed to follow/unfollow", error);
        }
    }, 300), [user]);

    if (loading || error || !user) {
        return <LoadingSpinner />;
    }

    const theme = useMemo(() => createTheme(), []);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <Card sx={{ mt: 4, p: 4, borderRadius: '16px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
                    <Box sx={{ display: 'flex', flexDirection: { lg: 'row', xs: 'column' }, alignItems: 'center' }}>
                        <Avatar
                            alt="User Avatar"
                            src={user.image ? `${import.meta.env.VITE_IMAGE_BASE_URL}${user.image}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                            sx={{ width: 120, height: 120, mr: { lg: 2 }, mb: { xs: 2 }, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: { lg: 'flex-start', xs: 'center' } }}>
                            <Typography variant="h4" component="div" fontWeight="bold" sx={{ mb: { xs: 1, lg: 0 } }}>
                                {user.username}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body1" color="textSecondary">
                                    {postCount} Posts
                                </Typography>
                                <button onClick={() => setOpenFollowers(!openFollowers)} className="mx-2 text-[#00000099]">
                                    {user.followers.length} Followers
                                </button>
                                {openFollowers && <Followers followers={user.followers} setOpenFollowers={setOpenFollowers} />}
                                <button onClick={() => setOpenFollowing(!openFollowing)} className="mx-2 text-[#00000099]">
                                    {user.follows.length} Following
                                </button>
                                {openFollowing && <Following following={user.follows} setOpenFollowing={setOpenFollowing} />}
                            </Box>
                            {user.id !== currentUser.id && (
                                <Box sx={{ my: 2 }}>
                                    <button onClick={handleFollow} className={`px-5 py-1 rounded-md ${followingStatus ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}>
                                        {followingStatus ? "Following" : "Follow"}
                                    </button>
                                    {user.follows.some(follow => follow.id === currentUser.id) && (
                                        <button className='bg-gray-300 px-2 rounded text-xs cursor-default ml-2'>
                                            Follows you
                                        </button>
                                    )}
                                </Box>
                            )}
                            <Typography variant="body1" color="textSecondary" sx={{ textAlign: { lg: 'center', xs: 'center' }, my: 2 }}>
                                {user.bio}
                            </Typography>
                        </Box>
                        {user.id === currentUser.id && (
                            <IconButton onClick={() => navigate(`/profile/edit/`)} size="large" sx={{ mt: { xs: 1, lg: 0 } }}>
                                <EditIcon />
                            </IconButton>
                        )}
                    </Box>
                </Card>
                <UserProvider>
                    <Posts author={user.username} onPostCountChange={setPostCount} />
                </UserProvider>
            </Container>
        </ThemeProvider>
    );
};

export default Profile;
