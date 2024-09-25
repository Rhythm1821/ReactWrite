import { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, List, ListItem, TextField, Typography } from "@mui/material";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Comments({ postId, authorId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();
    

    const fetchComments = async () => {
        try {
            const res = await api.get(`/posts/comments/${postId}/`);
            setComments(res.data);
        } catch (error) {
            alert("Failed to fetch comments", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            return navigate('/login')
        }
        try {
            if (!content) return;
            await api.post(`/posts/comments/${postId}/`, { author: authorId, content: content });
            fetchComments();
            setContent('');
        } catch (error) {
            alert("Failed to create comment", error);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Comments
            </Typography>
            <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>
            <List>
                {comments.map((comment) => (
                    <ListItem key={comment.id} sx={{ mb: 1, pl: 0 }}>
                        <Card sx={{ width: '100%', maxWidth: 600, ml: 0 }}>
                            <CardContent>
                                <Typography variant="body1">{comment.content}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    {comment.username}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
