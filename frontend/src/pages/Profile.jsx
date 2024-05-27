// src/components/Profile.js
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import '../styles/profile.css';

const Profile = () => {
    const { user } = useContext(UserContext);
    console.log(user);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1>Profile</h1>
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
