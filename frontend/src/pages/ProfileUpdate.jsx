import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../api";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, TextField, Box, Typography, CircularProgress, Avatar } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function ProfileUpdate() {
    const { user, loading } = useContext(UserContext);
    if (loading) return <div>Loading...</div>;

    const [bio, setBio] = useState(user.bio);
    const [image, setImage] = useState(user.image);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user', user.id);
        formData.append('bio', bio);
        if (image) {
            formData.append('image', image);
        }

        try {
            setUploading(true);
            const response = await api.put(`/users/profile/${user.id}/update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/');
        } catch (error) {
            console.error("Failed to update profile", error.response ? error.response.data : error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
                {user.image && (
                    <Avatar src={user.image} alt={`${user.username}'s profile`} sx={{ width: 100, height: 100, mb: 2 }} />
                )}
                <Typography variant="h4">Update Profile</Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} mt={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    disabled={uploading}
                >
                    Profile Image
                    <VisuallyHiddenInput type="file" onChange={(e) => setImage(e.target.files[0])} />
                </Button>
                <TextField
                    onChange={(e) => setBio(e.target.value)}
                    name="bio"
                    label="Bio"
                    multiline
                    maxRows={4}
                    fullWidth
                    required
                    value={bio}
                    sx={{ mt: 2, mb: 2, width: '80%' }}
                />
                <Button type="submit" variant="contained" color="primary" disabled={uploading}>
                    Update
                </Button>
            </Box>
        </>
    );
}
