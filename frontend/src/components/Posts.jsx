import React, { useEffect, useState, useContext } from "react";
import { Card, CardContent, Typography, Avatar, Box, Container } from '@mui/material';
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
                    key={post.id} 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        p: 2, 
                        borderRadius: '16px', 
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
                        m: 3, 
                        width: '60%', 
                        cursor: 'pointer' 
                    }}
                    onClick={() => navigate(`post/${post.id}`, { state: { post } })}
                >
                    <Avatar
                        src={post.author.image}
                        alt={post.author.username}
                        sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5, mb: 1.5 }}>
                            {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            {
                                <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                                    <FavoriteIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    {post.likes.length > 0 && post.likes.length} 
                                </Typography>
                            }
                            <Typography variant="body2" color="textSecondary">
                                {new Date(post.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            ))}
        </Container>
    );
}
