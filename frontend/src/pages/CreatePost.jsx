import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function CreatePost() {
  return (
    <>
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 2
      }}
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2} sx={{ width: '75ch' }}>
        <TextField
          id="post-title"
          label="Title"
          multiline
          maxRows={4}
          fullWidth
        />
        <TextField
          id="post-content"
          label="Content"
          multiline
          rows={4}
          fullWidth
        />
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </Box>
  </>
  );
}
