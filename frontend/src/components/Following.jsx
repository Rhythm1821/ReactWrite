import { useContext, useEffect, useState } from "react";
import api from "../api";
import { UserContext } from "../contexts/UserContext";

const Following = ({ following, setOpenFollowing }) => {
    const [followingStatus, setFollowingStatus] = useState({});
    const { user, loading } = useContext(UserContext);

    const toggleFollowing = async (id, username) => {
        try {
            await api.post(`/users/following/${username}/`);
            setFollowingStatus(prevState => ({
                ...prevState,
                [username]: !prevState[username]
            }));
        } catch (error) {
            console.error("Failed to follow/unfollow", error);
        }
    };

    useEffect(() => {
        const fetchFollowingStatus = async () => {
            if (!loading && user) {
                try {
                    const res = await api.get(`/users/following/${user.username}/`);
                    const status = {};
                    res.data.forEach(username => {
                        status[username] = true;
                    });
                    setFollowingStatus(status);
                } catch (error) {
                    console.error("Failed to fetch following status", error);
                }
            }
        };
        fetchFollowingStatus();
    }, [loading, user]);
    console.log("followingStatus", followingStatus);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-800 text-white rounded-lg w-80 sm:w-96 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Following</h2>
                    <button onClick={() => setOpenFollowing(false)} className="text-gray-400 hover:text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    {following.map((follow) => (
                        <div
                            key={follow.id}
                            className="flex justify-between items-center"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                                    {/* Placeholder for profile image */}
                                    <span className="text-sm font-medium">
                                        {follow?.image ?
                                            <img className="rounded-full" src={`${import.meta.env.VITE_IMAGE_BASE_URL}${follow.image}`} alt="" />
                                            : follow.username.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">{follow.username}</p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleFollowing(follow.id, follow.username);
                                }}
                                className="text-red-500 hover:text-red-400 bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-md"
                            >
                                {!followingStatus[follow.username] ? "Follow" : "Following"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Following;
