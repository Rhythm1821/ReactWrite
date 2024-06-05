import React, { useContext, useEffect, useState } from 'react';
import '../styles/profile.css';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FollowButton from '../components/FollowButton';

const Profile = () => {
    
    const [user, setUser] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await api.get(`/users/profile/${id}`)
            setUser(res.data)
            console.log(res);
        } catch (error) {
            console.log("Failed to fetch user", error);
            return <h2>No user found</h2>
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    

    if (!user.user) return <h2>No user found</h2>
    console.log('follows', user.follows);

    return (
        <div className="profile-container" >
            {user.image && <img className="profile-image" src={user.image} alt={`${user.username}'s profile`} />}
            <div className="profile-details">
                <h2 className="profile-username">{user.username}</h2>
                <p className="profile-email">{user.user && user.user.email}</p>
                <p className="profile-bio">{user.bio}</p>
                <ul>Followers: {user.followers.map((follower,index)=> {
                    return (
                            <li key={index}>{follower} <FollowButton status='followers' name={follower} /></li>
                    )
                })}
                </ul>

                <ul>Follows: 
                    {user.follows.map((follow,index)=> {
                        return (
                            <li key={index}>{follow} <FollowButton status='following' name={follow} /></li>
                        )
                    })}
                </ul>
            </div>
            <Button startIcon={<EditIcon />} onClick={() => navigate(`/profile/edit/`)} size="small">Edit</Button>
        </div>
    );
};

export default Profile;
