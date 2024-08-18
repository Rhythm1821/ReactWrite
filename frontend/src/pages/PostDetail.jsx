import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    ThemeProvider,
    Typography,
    createTheme,
} from "@mui/material";
import api from "../api";
import LikeButton from "../components/LikeButton";
import Comments from "../components/Comments";

export default function PostDetail() {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { post: initialPost } = state || {};
    const { user, loading } = useContext(UserContext);
    const theme = createTheme();

    const post = initialPost || {};

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/delete/${id}/`);
            return navigate("/");
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {post.content}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Author: {post.author.username}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Created at: {new Date(post.created_at).toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <LikeButton postId={post.id} numOfLikes={post.likes.length} />
                            <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                                {post.likes.length} likes
                            </Typography>
                        </Box>
                        {user && user.id === post.author.id && (
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/post/edit/${post.id}`, { state: { post } })}
                                    size="small"
                                    sx={{ mr: 2 }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(post.id)}
                                    size="small"
                                >
                                    Delete
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
                <Box sx={{ mt: 4 }}>
                    <Comments postId={post.id} authorId={post.author.id} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
