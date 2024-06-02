import React, { useContext, useEffect, useState } from 'react';
import '../styles/profile.css';
import api from '../api';
import { useParams } from 'react-router-dom';

const Profile = () => {
    
    const [user, setUser] = useState({})
    const { id } = useParams()

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
        </div>
    );
};

export default Profile;
