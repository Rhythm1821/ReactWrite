import React, { useContext, useEffect, useState } from 'react';
import '../styles/profile.css';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
    
    const [user, setUser] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await api.get(`/users/profile/${id}`)
            setUser(res.data)
            console.log(res.data);
        } catch (error) {
            console.log("Failed to fetch user", error);
            return <h2>No user found</h2>
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    

    if (!user.user) return <h2>No user found</h2>

    return (
        <div className="profile-container" >
            {user.image && <img className="profile-image" src={user.image} alt={`${user.username}'s profile`} />}
            <div className="profile-details">
                <h2 className="profile-username">{user.username}</h2>
                <p className="profile-email">{user.user && user.user.email}</p>
                <p className="profile-bio">{user.bio}</p>
            </div>
            <Button startIcon={<EditIcon />} onClick={() => navigate(`/profile/edit/`)} size="small">Edit</Button>
        </div>
    );
};

export default Profile;
