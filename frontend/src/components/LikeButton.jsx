// LikeButton.js
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled, useTheme } from '@mui/system';
import api from '../api';

const LikeButton = ({ postId, numOfLikes }) => {
  const [liked, setLiked] = useState(false);
  const theme = useTheme();

  const handleLikeClick = async () => {
    setLiked(!liked);
    console.log('Liked:', !liked);
    try {
        const response = await api.post(`/posts/toggle-like-button/${postId}/`);
        console.log('Response', response.data);
        console.log('Toggled like');
    } catch (error) {
        console.log('Failed to toggle like', error);
    }
  };

  const StyledIconButton = styled(IconButton)({
    color: liked ? theme.palette.secondary.main : theme.palette.grey[500],
  });

  return (
    <>
    <StyledIconButton onClick={handleLikeClick}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {numOfLikes}
    </StyledIconButton>
    </>
  );
};

export default LikeButton;
