import { useContext } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"
import EditPost from "./EditPost"
import { Button } from "@mui/material"
import api from "../api"

export default function PostDetail() {
    const { id } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()
    const { post: initialPost } = state || {}
    const { user, loading } = useContext(UserContext)

    const post = initialPost || {}

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/delete/${id}`)
            console.log("Post deleted successfully");
            return navigate("/")
        } catch (error) {
            console.log("Failed to delete post", error);
        }
    }

    if (loading) return <div>Loading...</div>
    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Author: {post.author.username}</p>
            <p>Created at: {post.created_at}</p>
            {
                user && user.id === post.author.id && (
                    <>
                    <Button onClick={() => navigate(`/post/edit/${post.id}`, { state: { post }})}  size="small">Edit</Button>
                    <Button onClick={() => handleDelete(post.id)} size="small">Delete</Button>
                    </>
                )
            }
        </>
    )
}