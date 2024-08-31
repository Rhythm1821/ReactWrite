import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import api from "../api";
import { UserContext } from "../contexts/UserContext";
import { debounce } from "lodash"; // Assuming you have lodash installed

const Followers = ({ followers, setOpenFollowers }) => {
  const [followingStatus, setFollowingStatus] = useState({});
  const { user, loading } = useContext(UserContext);

  const toggleFollowing = useCallback(debounce(async (id, username) => {
    setFollowingStatus(prevState => ({
      ...prevState,
      [username]: 'loading'
    }));

    try {
      await api.post(`/users/following/${username}/`);
      setFollowingStatus(prevState => ({
        ...prevState,
        [username]: prevState[username] !== 'loading'
      }));
    } catch (error) {
      console.error("Failed to follow/unfollow", error);
      setFollowingStatus(prevState => ({
        ...prevState,
        [username]: prevState[username] === 'loading' ? !prevState[username] : prevState[username]
      }));
    }
  }, 300), []);

  useEffect(() => {
    if (loading || !user) return;

    const fetchFollowingStatus = async () => {
      try {
        const res = await api.get(`/users/following/${user.username}/`);
        const status = res.data.reduce((acc, username) => {
          acc[username] = true;
          return acc;
        }, {});
        setFollowingStatus(status);
      } catch (error) {
        console.error("Failed to fetch following status", error);
      }
    };

    fetchFollowingStatus();
  }, [loading, user]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white rounded-lg w-80 sm:w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Followers</h2>
          <button onClick={() => setOpenFollowers(false)} className="text-gray-400 hover:text-gray-300">
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
          {followers.map((follower) => (
            <div
              key={follower.id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">
                  {follower.image ? (
                    <img className="rounded-full" src={`${import.meta.env.VITE_IMAGE_BASE_URL}${follower.image}`} alt="" />
                  ) : (
                    <span className="text-sm font-medium">{follower.username.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{follower.username}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFollowing(follower.id, follower.username)}
                className="text-red-500 hover:text-red-400 bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-md"
                disabled={followingStatus[follower.username] === 'loading'}
              >
                {followingStatus[follower.username] === 'loading' ? "Loading..." : followingStatus[follower.username] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
