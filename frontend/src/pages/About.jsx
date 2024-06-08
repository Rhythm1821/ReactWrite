import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";

export default function About() {
    const [comments, setComments] = useState([]);
    const { user, loading } = useContext(UserContext);
    const { isAuthenticated } = useAuth()

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get(`/posts/comments/13/`)
                setComments(res.data);
                console.log('Comments fetched successfully', res.data);
            } catch (error) {
                console.log("Failed to fetch comments", error);
            }
        }

        fetchComments();
    })
    // console.log('user', user);
    
    return (
        <>
            <h1>About</h1>
            <h1>Hello {user?.username}</h1>
            <h1>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</h1>
            <h2>Comments: {comments.map(comment => {
                return <p key={comment.id}>{comment.content}</p>
            })}</h2>
        </>
    )
}