import { useParams, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../api";
import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";

export default function EditPost() {
  const { id } = useParams();
  const { state } = useLocation();
  const { post: initialPost } = state || {};
  const [post, setPost] = useState(initialPost);
  const [error, setError] = useState(null);
  const [ snackBarOpen, setSnackBarOpen ] = useState(false);

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
    const author = post.author.id
    api.put(`/posts/edit/${id}/`, { title, content, author })
      .then(() => {
        window.location.href = "/";
        setSnackBarOpen(true)
      })
      .catch((error) => {
        console.error("Failed to update post", error);
      });
  }

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };
  if (error) return <div>{error}</div>;

  return (
    <>
    <Box
    component="form"
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', m: 2 }}
    noValidate
    autoComplete="off"
    onSubmit={handleEdit}
  >
    <h1>Edit Post</h1>
    <Stack spacing={2} sx={{ width: '75ch' }}>
      <TextField
        id="post-title"
        name="title"
        label="Title"
        multiline
        maxRows={4}
        fullWidth
        required
        value={post.title}
        onChange={handleChange}
      />
      <TextField
        id="post-content"
        name="content"
        label="Content"
        multiline
        rows={4}
        fullWidth
        required
        value={post.content}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit">
        Save
      </Button>
    </Stack>
  </Box>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Post updated successfully!
        </Alert>
      </Snackbar>
  </>
  );
}
