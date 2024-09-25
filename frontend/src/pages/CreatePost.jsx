import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  
  const { user, loading } = React.useContext(UserContext);
  if (loading) {
    return (
        <div className="absolute flex items-center justify-center inset-0 bg-opacity-50">
          <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
}

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User is not logged in");
      return;
    }
    const author = user.id;
    try {
      await api.post('/posts/', { title, content, author });
      setTitle('');
      setContent('');
      return navigate('/');
    } catch (error) {
      alert("Failed to create post", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{ m: 2 }}
      noValidate
      autoComplete="off"
      onSubmit={handleAdd}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <TextField
              id="post-title"
              label="Title"
              multiline
              maxRows={4}
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="post-content"
              label="Content"
              multiline
              rows={4}
              fullWidth
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button variant="contained" type="submit">
              Create
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreatePost;
