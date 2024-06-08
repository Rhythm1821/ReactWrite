import { useEffect, useState } from "react";
import api from "../api";

export default function Comments({postId,authorId}) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');

    

    const fetchComments = async () => {
        try {
            const res = await api.get(`/posts/comments/${postId}/`)
            setComments(res.data);
        } catch (error) {
            console.log("Failed to fetch comments", error);
        }
    }
    useEffect(() => {

        fetchComments();
    })

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            if (!content) return
            await api.post(`/posts/comments/${postId}/`, {author: authorId, content: content})
            console.log("Comment created successfully");
            fetchComments();
            setContent('');

        } catch (error) {
            console.log("Failed to create comment", error);
        }
    }

    return (
        <>
            <h1>Comments</h1>

            <form onSubmit={handleComment} action="" method="post">
                <input type="text" onChange={(e)=>setContent(e.target.value)} name="content" placeholder="Comment" />
                <button>Submit</button>
            </form>

            <ul>
            <h2>{comments.map(comment => {
                return (
                    <li key={comment.id}>
                        <p>{comment.content}</p>
                        <h5>{comment.username}</h5>
                    </li>
                )
            })}</h2>
            </ul>
        </>
    )
}