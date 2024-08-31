import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Container,
    IconButton,
    Typography,
    createTheme,
    Avatar,
    ThemeProvider,
    Divider
} from "@mui/material";
import api from "../api";
import LikeButton from "../components/LikeButton";
import Comments from "../components/Comments";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoadingSpinner } from "../utils";

export default function PostDetail() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState(state || {});
    const { user, loading } = useContext(UserContext);
    const theme = createTheme();

    const handleDelete = async (postId) => {
        try {
            await api.delete(`/posts/delete/${postId}/`);
            navigate("/");
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await api.get(`/posts/${id}/`);
                console.log(res.data);
                setPost(res.data);
            } catch (error) {
                alert(error);
            }
        };

        if (!post.author) {
            fetchPost();
        }
    }, [id, post.author]);

    if (loading || !post.author) {
        return <LoadingSpinner />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                <Card
                    sx={{
                        p: 4,
                        borderRadius: '16px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.12)',
                        }
                    }}
                >
                    <CardContent>
                        <Box
                            onClick={() => navigate(`/profile/${post.author.id}/`)}
                            sx={{ display: 'flex', alignItems: 'center', mb: 3, cursor: 'pointer' }}
                        >
                            <Avatar
                                src={post.author.image ? `${import.meta.env.VITE_IMAGE_BASE_URL}${post.author.image}` : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                alt={"Profile Avatar"}
                                sx={{ width: 56, height: 56, mr: 2 }}
                            />
                            <Typography variant="h6" color="text.secondary">
                                {post.author.username}
                            </Typography>
                        </Box>
                        <Divider sx={{ mb: 3 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="h4" fontWeight="bold">
                                {post.title}
                            </Typography>
                            {user.id === post.author.id && (
                                <CardActions>
                                    <IconButton onClick={() => navigate(`/posts/edit/${post.id}`, { state: { post } })} size="large">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(post.id)} size="large">
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            )}
                        </Box>
                        <Typography variant="body1" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
                            {post.content}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                            <LikeButton postId={post.id} numOfLikes={post.likes.length} />
                            <Typography variant="subtitle1" color="text.secondary">
                                {new Date(post.created_at).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
                <Box sx={{ mt: 4 }}>
                    <Comments postId={post.id} authorId={post.author.id} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
