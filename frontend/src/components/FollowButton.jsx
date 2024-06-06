import { useEffect, useState } from "react";
import api from "../api";

export default function FollowButton({status, name}) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const res = await api.get(`/users/${status}/${name}/`)
                setIsFollowing(res.data.isFollowing);
            } catch (error) {
                console.log('Failed to fetch follow status', error);
            }
        }

        fetchFollowStatus();
    },[status, name]);

    const handleFollow = async () => {
        try {
            await api.post(`/users/${status}/${name}/`)
        } catch (error) {
            console.log('Failed to follow', error);
        }
        setIsFollowing(!isFollowing);
    }

    return (
        <>
            <button onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
        </>
    )
}