import React, { useEffect, useState, useContext, useCallback } from "react";
import { Container } from '@mui/material';
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import PostCard from "./PostCard";
import { EmptyState, ErrorMessage, LoadingSpinner } from "../utils";


export default function Posts({ author = '', onPostCountChange = () => { } }) {
    const { user, loading } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPosts = useCallback(async () => {
        try {
            const response = await api.get(`/posts/?author=${author}`);
            setPosts(response.data);
            onPostCountChange(response.data.length);
        } catch (error) {
            console.error("Failed to fetch posts", error);
        } finally {
            setPostsLoading(false);
        }
    }, [author, onPostCountChange]);

    useEffect(() => {
        if (!loading) {
            fetchPosts();
        }
    }, [loading, user]);

    if (loading || postsLoading) {
        return <LoadingSpinner />;
    }

    // if (!user) {
    //     return <ErrorMessage message="User data not available" />;
    // }

    if (posts.length === 0) {
        return <EmptyState message="No posts available" />;
    }

    return (
        <Container>
            {posts.map((post) => (
                <PostCard key={post.id} post={post} onNavigate={navigate} />
            ))}
        </Container>
    );
}
