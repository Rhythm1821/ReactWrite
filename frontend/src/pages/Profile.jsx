import React, { useContext, useEffect, useState } from 'react';
import '../styles/profile.css';
import api from '../api';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FollowButton from '../components/FollowButton';
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
    const [user, setUser] = useState({
        image: '',
        username: '',
        email: '',
        bio: '',
        followers: [],
        follows: [],
        id: null
    });
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: currentUser, loading } = useContext(UserContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/profile/${id}`);
                setUser(res.data);
                setError(false);
            } catch (error) {
                console.log("Failed to fetch user", error);
                setError(true);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (error || !user.username) return <h2>No user found</h2>;

    return (
        <div className="profile-container">
            {user.image && <img className="profile-image" src={user.image} alt={`${user.username}'s profile`} />}
            <div className="profile-details">
                <h2 className="profile-username">{user.username}</h2>
                <FollowButton status='followers' name={user.username} />
                <p className="profile-email">{user.email}</p>
                <p className="profile-bio">{user.bio}</p>
                <ul>
                    Followers: {user.followers.map((follower, index) => (
                        <li key={index}>{follower} <FollowButton status='followers' name={follower} /></li>
                    ))}
                </ul>
                <ul>
                    Follows: {user.follows.map((follow, index) => (
                        <li key={index}>{follow} <FollowButton status='following' name={follow} /></li>
                    ))}
                </ul>
            </div>
            {user.id === currentUser.id && (
                <Button startIcon={<EditIcon />} onClick={() => navigate(`/profile/edit/`)} size="small">
                    Edit
                </Button>
            )}
        </div>
    );
};

export default Profile;
