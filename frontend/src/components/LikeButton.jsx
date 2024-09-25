import React, { useEffect, useState, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import api from '../api';
import { useAuth } from "../contexts/AuthContext";

const LikeButton = ({ postId, numOfLikes }) => {
  const [toggleNumLikes, setToggleNumLikes] = useState(numOfLikes);
  const [liked, setLiked] = useState(false);
  const {isAuthenticated} = useAuth()

  if (!isAuthenticated) {
    return null
  }

  const handleLikeClick = useCallback(async () => {
    setLiked((prevLiked) => !prevLiked);
    setToggleNumLikes((prevNum) => liked ? prevNum - 1 : prevNum + 1);

    try {
      await api.post(`/posts/toggle-like-button/${postId}/`);
    } catch (error) {
      // Revert the UI state if the request fails
      setLiked((prevLiked) => !prevLiked);
      setToggleNumLikes((prevNum) => liked ? prevNum + 1 : prevNum - 1);
      alert('Failed to toggle like', error);
    }
  }, [liked, postId]);

  useEffect(() => {
    const fetchUserLikeStatus = async () => {
      try {
        const response = await api.get(`/posts/toggle-like-button/${postId}/`);
        setLiked(response.data);
      } catch (error) {
        alert('Failed to fetch user in post likes', error);
      }
    };

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