import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import api from "../api";


export default function UserAccount() {
    const [userAccount, setUserAccount] = useState({});
    const { user, loading } = useContext(UserContext);

    useEffect(() => {
        if (user && user.id) {
            api.get(`users/${user.id}/`)
                .then(res => setUserAccount(res.data))
                .catch(err => console.log(err));
        }
    })

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <h1>User Account</h1>
            <h1>Hello {user?.username}</h1>
            <h2>Username: {userAccount.username}</h2>
            <h2>Email: {userAccount.email}</h2>
        </>
    );

}