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
import { ThemeProvider } from "@emotion/react";
import { Container, createTheme } from "@mui/material";
import LikeButton from "./LikeButton";

export default function Posts() {
    const { user, loading } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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
            await api.delete(`/posts/delete/${id}`);
            console.log("Post deleted successfully");
            await fetchPosts();
        } catch (error) {
            console.log("Failed to delete post", error);
        }
    };

    const handleEdit = (post) => {
        navigate(`post/edit/${post.id}`, { state: { post } });
    };

    const toggleLike = async () => {
        console.log('Toggling like')
        try {
            await api.post(`/posts/toggle-like-button/${postId}`);
            console.log('Toggled like');
        } catch (error) {
            console.log('Failed to toggle like', error);
        }
      }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error: User data not available</div>;
    }

    return (
        <>
        <br />

            {posts.map(post => (
                <Box sx={{ minWidth: 275 }} key={post.id}>
                    
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2">
                                {post.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Typography variant="body2" color="textSecondary">
                                <Link to={`/profile/${post.author.id}`}>- {post.author.username}</Link>
                            </Typography>
                        </CardActions>
                        <ThemeProvider theme={theme}>
                            <Container>
                                <Typography variant="h4" component="h1" gutterBottom>
                                <LikeButton postId={post.id} numOfLikes={post.likes.length} />
                                </Typography>
                                
                            </Container>
                        </ThemeProvider>
                        <Button onClick={() => navigate(`post/${post.id}`, { state: { post } })} size="small">View</Button>
                        {user.id === post.author.id &&
                            <>
                                <Button startIcon={<EditIcon />} onClick={() => handleEdit(post)} size="small">Edit</Button>
                                <Button startIcon={<DeleteIcon />} onClick={() => { handleDelete(post.id) }} size="small">Delete</Button>
                            </>
                        }
                    </Card>
                    <br />
                </Box>
            ))}
        </>
    );
}
