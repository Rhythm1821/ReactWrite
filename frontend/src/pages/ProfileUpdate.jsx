import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import api from "../api"

export default function ProfileUpdate() {
    const {user, loading} = useContext(UserContext)
    if (loading) return <div>Loading...</div>
    // const [username, setUsername] = useState(user.username)
    // const [email, setEmail] = useState(user.email)
    const [bio, setBio] = useState(user.bio)
    const [image, setImage] = useState(user.image)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('user', user.id);
        formData.append('email', email);
        formData.append('bio', bio);
        if (image) {
            formData.append('image', image);
        }
    
        // Debug: Log formData entries
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            console.log('formData', formData);
            const response = await api.put(`/users/profile/${user.id}/update/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Profile updated successfully", response.data);
            // window.location.href = "/";
        } catch (error) {
            console.log("Failed to update profile", error.response ? error.response.data : error);
        }
    };
    

    

    return (
        <>
        {user.image && <img className="profile-image" src={user.image} alt={`${user.username}'s profile`} />}
        <h2>ProfileUpdate</h2>
        <div>
            <p>Username: {user.username}</p>
            {/* <p>Email: {user.email}</p> */}
            <p>Bio: {user.bio}</p>
            <p>Image: {user.image}</p>
        </div>
        <form action="" className="form-container" onSubmit={handleSubmit}>

            <input type="file" name="image" className="form-input" onChange={(e)=>setImage(e.target.files[0])} />

            <label className="form-label" htmlFor="email">Bio</label>
            <input className="form-input" type="text" name="email" value={bio} onChange={(e)=>setBio(e.target.value)} />

            <button className="form-button" type="submit">Update</button>
        </form>
        </>
    )
}