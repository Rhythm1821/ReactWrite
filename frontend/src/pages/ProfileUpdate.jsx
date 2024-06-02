import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import api from "../api"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdate() {
    const {user, loading} = useContext(UserContext)
    if (loading) return <div>Loading...</div>
    // const [username, setUsername] = useState(user.username)
    // const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)
    const [image, setImage] = useState(user.image)

    const navigate = useNavigate()

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('user', user.id);
        // formData.append('email', email);
        formData.append('bio', bio);
        if (image) {
            formData.append('image', image);
        }
    
        // Debug: Log formData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            console.log('formData', formData);
            const response = await api.put(`/users/profile/${user.id}/update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Profile updated successfully", response.data);
            navigate('/')
        } catch (error) {
            console.log("Failed to update profile", error.response ? error.response.data : error);
        }
    };
    

    return (
        <>
        {user.image && <img className="profile-image" src={user.image} alt={`${user.username}'s profile`} />}
        <h2>ProfileUpdate</h2>
        <div>
            <p>Username: {user.username}</p>
            {/* <p>Email: {user.email}</p> */}
            <p>Bio: {user.bio}</p>
            <p>Image: {user.image}</p>
        </div>
        <form action="" className="form-container" onSubmit={handleSubmit}>

            {/* <input type="file" name="image" className="form-input" onChange={(e)=>setImage(e.target.files[0])} /> */}
            <Button onChange={(e)=>setImage(e.target.files[0])}
                component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} >
                Profile Image
                <VisuallyHiddenInput type="file" />
            </Button>
            <br />

            {/* <label className="form-label" htmlFor="bio">Bio</label> */}
            {/* <input className="form-input" type="text" name="bio" value={bio} onChange={(e)=>setBio(e.target.value)} /> */}


            <TextField
                onChange={(e)=>setBio(e.target.value)}
                id="post-title"
                name="bio"
                label="bio"
                multiline
                maxRows={4}
                fullWidth
                required
                value={bio}
            />

            <button className="form-button" type="submit">Update</button>
        </form>
        </>
    )
}