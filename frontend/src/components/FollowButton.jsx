import { useState } from "react";
import api from "../api";

export default function FollowButton({status, name}) {
    const [isFollowing, setIsFollowing] = useState(true);

    const handleFollow = async () => {
        const res = await api.post(`/users/${status}/${name}/`)
        console.log(res.data);
        setIsFollowing(!isFollowing);
    }

    return (
        <>
            <button onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
        </>
    )
}