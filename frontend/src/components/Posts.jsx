import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Avatar, Box, Container, Divider, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Posts() {
    const { user, loading } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
            const response = await api.get('/posts/?author=');
            setPosts(response.data);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        }
    };

    useEffect(() => {
        if (!loading && user) {
            fetchPosts();
        }
    }, [loading, user]);

    if (loading) {
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

    if (!user) {
        return <div className="text-center text-red-500 text-2xl">Error: User data not available</div>;
    }

    return (
        <Container>
            {posts.map((post) => (
                <Card
                    className="flex flex-col transition-transform hover:scale-[1.02]"
                    key={post.id}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 4,
                        borderRadius: '16px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                        m: 3,
                        width: '60%',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.12)',
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={post.author?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            alt={post.author.username}
                            sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Typography variant="subtitle1" color="textSecondary" fontWeight="medium">
                            {post.author.username}
                        </Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box
                        onClick={() => navigate(`post/${post.id}`, { state: { post } })}
                        sx={{ flex: 1, cursor: 'pointer' }}
                    >
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 1.5 }}>
                            {post.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 2, lineHeight: 1.6 }}
                        >
                            {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Button
                            startIcon={<FavoriteIcon />}
                            size="small"
                            color="primary"
                            variant="text"
                        >
                            {post.likes.length}
                        </Button>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(post.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Card>
            ))}
        </Container>
    );

}
