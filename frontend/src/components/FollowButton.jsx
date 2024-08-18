import { useEffect, useState } from "react";
import api from "../api";
import { Button, CircularProgress } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

export default function FollowButton({ status, name }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/users/${status}/${name}/`);
                setIsFollowing(res.data.isFollowing);
            } catch (error) {
                console.error('Failed to fetch follow status', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowStatus();
    }, [status, name]);

    const handleFollow = async () => {
        setLoading(true);
        try {
            await api.post(`/users/${status}/${name}/`);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Failed to follow/unfollow', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant={isFollowing ? "contained" : "outlined"}
            color={isFollowing ? "secondary" : "primary"}
            startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
            onClick={handleFollow}
            disabled={loading}
            size="small"
        >
            {loading ? <CircularProgress size={24} /> : isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    );
}
