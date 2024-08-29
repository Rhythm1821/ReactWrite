// LikeButton.js
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import api from '../api';

const LikeButton = ({ postId, numOfLikes }) => {
  const [toggleNumLikes, setToggleNumLikes] = useState(numOfLikes);
  const [liked, setLiked] = useState(false);
  const handleLikeClick = async () => {
    setLiked((prevLiked) => !prevLiked);
    setToggleNumLikes((prevNum)=> liked ? prevNum - 1 : prevNum + 1);
    try {
        const response = await api.post(`/posts/toggle-like-button/${postId}/`);
        setToggleNumLikes(response.data);
    } catch (error) {
        console.error('Failed to toggle like', error);
    }
  };

  const fetchUserLikeStatus = async () => {
    try {
      const response = await api.get(`/posts/toggle-like-button/${postId}/`);
      setLiked(response.data)
    } catch (error) {
      console.error('Failed to fetch user in post likes', error);
    }
  };

  useEffect(() => {
    fetchUserLikeStatus();
  }, [postId]);

  return (
    <div className='flex items-center text-gray-700'>
    <IconButton onClick={handleLikeClick} aria-label="like">
      {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
    {toggleNumLikes}
    </div>
  );
};

export default LikeButton;
