import { useEffect, useState, useContext } from "react";
import api from "../api";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from "../contexts/UserContext";

export default function Posts() {
    const { user, loading } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts/?author=');
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch posts", error);
            }
        };
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            console.error("User is not logged in");
            return;
        }

        const author = user.id;
        console.log("author",author);
        try {
            await api.post('/posts/', { title, content, author });
            setTitle('');
            setContent('');
            // Fetch the posts again to update the list
            const response = await api.get('/posts/?author=');
            setPosts(response.data);
            console.log("Post created successfully");
        } catch (error) {
            console.error("Failed to create post", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error: User data not available</div>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Submit</button>
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
                        <Button size="small">Edit</Button>
                        <Button size="small">Delete</Button>
                    </Card>
                    <br />
                </Box>
            ))}
        </>
    );
}
