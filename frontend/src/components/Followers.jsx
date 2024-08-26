import { useState } from "react";

const Followers = ({followers}) => {

  const removeFollower = (id) => {
    followers.filter((follower) => follower.id !== id)
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 text-white rounded-lg w-80 sm:w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Followers</h2>
          <button className="text-gray-400 hover:text-gray-300">
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
                  {/* Placeholder for profile image */}
                  <span className="text-sm font-medium">
                    {follower?.image ? 
                    <img className="rounded-full" src={`${import.meta.env.VITE_IMAGE_BASE_URL}${follower.image}`} alt="" /> 
                    : follower.username.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{follower.username}</p>
                  {/* <p className="text-sm text-gray-400">{follower.name}</p> */}
                </div>
              </div>
              <button
                onClick={() => removeFollower(follower.id)}
                className="text-red-500 hover:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
