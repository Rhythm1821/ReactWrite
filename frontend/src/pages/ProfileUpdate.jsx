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
    
    // Hooks should be defined unconditionally
    const [username, setUsername] = useState(user?.username || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [image, setImage] = useState(user?.image);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if (user) {
            setUsername(user.username)
            setBio(user.bio)
            setImage(user.image)
            console.log(user);
        }
    },[user])

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
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('user', user.id);
        formData.append('bio', bio);
        if (image) {
            formData.append('image', image);
        } else {
            formData.append('image', user.image);
        }

        try {
            setUploading(true);
            const res = await api.put(`/users/profile/${user.id}/update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);

            if (res.status === 200) {
                console.log("Profile updated successfully");
            }
            navigate(`/profile/${user.id}/`);
        } catch (error) {
            console.error("Failed to update profile", error.response ? error.response.data : error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Username Input */}
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name="username"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Image Input */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        name="image"
                        accept="image/*"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Bio Input */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="3"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
