import React, { useCallback } from 'react';
import { Card, Typography, Avatar, Box, Divider } from '@mui/material';
import LikeButton from "./LikeButton";
import { useNavigate } from 'react-router-dom';

const PostCard = React.memo(({ post }) => {
    const navigate = useNavigate();

    const handleNavigate = useCallback(() => {
        navigate(`/post/${post.id}`, {state: { post }});
    },[post, navigate]);

    const handleProfileNavigations = useCallback(()=>{
        navigate(`/profile/${post.author.id}/`);
    },[navigate, post.author.id]);
    return (
        <Card
            className="flex flex-col transition-transform hover:scale-[1.02]"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 4,
                borderRadius: '16px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                m: 3,
                width: '95%',
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.12)',
                }
            }}
        >
            <Box onClick={handleProfileNavigations} sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: 'pointer' }}>
                <Avatar
                    src={post.author?.image ? `${import.meta.env.VITE_IMAGE_BASE_URL}${post.author.image}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                    alt={"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Typography variant="subtitle1" color="textSecondary" fontWeight="medium">
                    {post.author.username}
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box onClick={handleNavigate} sx={{ flex: 1, cursor: 'pointer' }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1.5 }}>
                    {post.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <LikeButton postId={post.id} numOfLikes={post.likes.length} />
                <Typography variant="body2" color="text.secondary">
                    {new Date(post.created_at).toLocaleDateString()}
                </Typography>
            </Box>
        </Card>
    );
});

export default PostCard;
