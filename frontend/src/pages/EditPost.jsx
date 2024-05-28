import { Navigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import api from "../api";

export default function EditPost(){
    const { id } = useParams()
    const { user, loading } = useContext(UserContext);
    console.log(user);

    if (loading) return <div>Loading...</div>;
    
    const [post, setPost] = useState({})

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/${id}`)
            setPost(res.data)
            console.log("post",post);
        } catch (error) {
            console.log("Failed to fetch post", error);
        }
    }

    useEffect(() => {
        fetchPost()
        console.log("post",post);
    }, [])

    return (
        <div>
            Edit
            <p>{ id }</p>
            <p>{ post.title }</p>
            <p>{ post.content }</p>
            <h1>Edit</h1>
            <h2>{post.author.username}</h2>

            <form action="">
                <input type="text" name="title" value={post.title} />
                <input type="text" name="content" value={post.content} />
                <input type="text" name="author" value={post.author.username} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}