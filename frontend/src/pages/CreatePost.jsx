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
    return <div>Loading...</div>;
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not logged in");
      return;
    }
    const author = user.id;
    try {
      await api.post('/posts/', { title, content, author });
      console.log("Post created successfully");
      setTitle('');
      setContent('');
      return navigate('/');
    } catch (error) {
      console.error("Failed to create post", error);
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