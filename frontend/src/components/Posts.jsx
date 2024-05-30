import { useEffect, useState, useContext } from "react";
import api from "../api";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Posts() {
    const { user, loading } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error("User is not logged in");
            return;
        }
        const author = user.id;
        try {
            await api.post('/posts/', { title, content, author });
            console.log("Post created successfully");
            setTitle('');
            setContent('');
            await fetchPosts(); // Fetch the posts again to update the list
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error: User data not available</div>;
    }

    return (
        <>
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <br />
                <textarea
                    name="content"
                    placeholder="Content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

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
                                - {post.author.username}
                            </Typography>
                        </CardActions>
                        <Button onClick={() => navigate(`post/${post.id}`, { state: { post } })} size="small">View</Button>
                        {user.id === post.author.id &&
                            <>
                                <Button onClick={() => handleEdit(post)} size="small">Edit</Button>
                                <Button onClick={() => { handleDelete(post.id) }} size="small">Delete</Button>
                            </>
                        }
                    </Card>
                    <br />
                </Box>
            ))}
        </>
    );
}
