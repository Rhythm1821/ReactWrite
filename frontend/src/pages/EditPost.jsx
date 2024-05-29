import { useParams, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import api from "../api";

export default function EditPost() {
  const { id } = useParams();
  const { state } = useLocation();
  const { post: initialPost } = state || {};
  const { user, loading } = useContext(UserContext);
  const [post, setPost] = useState(initialPost || { title: '', content: '', author: { username: '' } });
  const [error, setError] = useState(null);
  const [postLoading, setPostLoading] = useState(!initialPost);

  useEffect(() => {
    if (!initialPost) {
      const fetchPost = async () => {
        try {
          const res = await api.get(`/posts/${id}`);
          setPost(res.data);
        } catch (error) {
          setError("Failed to fetch post");
          console.error("Failed to fetch post", error);
        } finally {
          setPostLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, initialPost]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const title = post.title
    const content = post.content
    const author = user.id
    console.log('user',user);
    api.put(`/posts/edit/${id}/`, { title, content, author })
      .then(() => {
        console.log("Post updated successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Failed to update post", error);
      });
  }

  if (loading || postLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
