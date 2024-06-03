import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

export default function About() {
    const { user, loading } = useContext(UserContext);
    const { isAuthenticated } = useAuth()
    console.log('user', user);
    
    return (
        <>
            <h1>About</h1>
            <h1>Hello {user?.username}</h1>
            <h1>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</h1>
        </>
    )
}