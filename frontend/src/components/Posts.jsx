import { useEffect, useState, useContext } from "react";
import api from "../api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, Container, createTheme, IconButton } from "@mui/material";
import LikeButton from "./LikeButton";

export default function Posts() {
    const { user, loading } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const theme = createTheme();

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

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/delete/${id}/`);
            await fetchPosts();
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const handleEdit = (post) => {
        navigate(`post/edit/${post.id}`, { state: { post } });
    };

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
        return <div>Error: User data not available</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                {posts.map((post) => (
                    <Box sx={{ mb: 4 }} key={post.id}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" color="textSecondary" gutterBottom>
                                    {post.content}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="subtitle2" color="textSecondary" sx={{ mr: 2 }}>
                                        <Link to={`/profile/${post.author.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            - {post.author.username}
                                        </Link>
                                    </Typography>
                                    <LikeButton postId={post.id} numOfLikes={post.likes.length} />
                                </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                                <Box>
                                    <Button size="small" onClick={() => navigate(`post/${post.id}`, { state: { post } })}>
                                        View
                                    </Button>
                                    {user.id === post.author.id && (
                                        <>
                                            <IconButton onClick={() => handleEdit(post)} size="small">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(post.id)} size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Container>
        </ThemeProvider>
    );
}
