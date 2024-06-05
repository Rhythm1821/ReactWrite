// LikeButton.js
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled, useTheme } from '@mui/system';
import api from '../api';

const LikeButton = ({ postId, numOfLikes }) => {
  const [toggleNumLikes, setToggleNumLikes] = useState(numOfLikes);
  const [liked, setLiked] = useState(false);
  const theme = useTheme();

  const handleLikeClick = async () => {
    setLiked(!liked);
    try {
        const response = await api.post(`/posts/toggle-like-button/${postId}/`);
        setToggleNumLikes(response.data);
    } catch (error) {
        console.log('Failed to toggle like', error);
    }
  };

  const fetchUserLikeStatus = async () => {
    try {
      const response = await api.get(`/posts/toggle-like-button/${postId}/`);
      setLiked(response.data)
    } catch (error) {
      console.log('Failed to fetch user in post likes', error);
    }
  };

  useEffect(() => {
    fetchUserLikeStatus();
  }, [postId]);

  const StyledIconButton = styled(IconButton)({
    color: liked ? theme.palette.secondary.main : theme.palette.grey[500],
  });

  return (
    <>
    <StyledIconButton onClick={handleLikeClick}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} {toggleNumLikes}
    </StyledIconButton>
    </>
  );
};

export default LikeButton;
